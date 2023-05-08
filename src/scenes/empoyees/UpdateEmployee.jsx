import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, message } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import baseURL from "../../api_requests/url";

function UpdateEmployee() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    company_email: "",
    password: "",
    Active: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const [messageApi, contextHolder] = message.useMessage();
  const messages = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;

  const handleInput = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (value, e) => {
    setEmployee({
      ...employee,
      [e.type]: value,
    });
  };

  const onFinish = async () => {
    setLoading(true);
    try {
      await baseURL({
        url: `/api/v1/admin/update/${location.state.employee_id}`,
        method: "PUT",
        data: employee,
      })
        .then((res) => {
          if (res.request.status === 200) {
            messages("success", "employee updated successfully");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
    form.resetFields();
  };

  return (
    <>
      {contextHolder}
      <Breadcrumb
        style={{ padding: 20 }}
        items={[
          {
            title: (
              <>
                <HomeOutlined />
                <span onClick={() => navigate("/employees")}>Employees</span>
              </>
            ),
          },
          {
            title: (
              <>
                <HomeOutlined />
                <span onClick={() => navigate("/update_employee")}>
                  Update Employee
                </span>
              </>
            ),
          },
        ]}
      />
      <div>
        <Form
          {...formItemLayout}
          layout={formLayout}
          onFinish={onFinish}
          form={form}
          initialValues={{
            layout: formLayout,
          }}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="First Name" name="first_name">
            <Input
              type="text"
              placeholder="First Name"
              name="first_name"
              onChange={handleInput}
              required
            />
          </Form.Item>

          <Form.Item label="Last Name" name="last_name">
            <Input
              placeholder="Last Name"
              type="text"
              name="last_name"
              onChange={handleInput}
              required
            />
          </Form.Item>

          <Form.Item label="Email" name="company_email">
            <Input
              placeholder="Company Email"
              type="email"
              name="company_email"
              onChange={handleInput}
              required
            />
          </Form.Item>

          <Form.Item label="Phone No" name="phone">
            <Input
              type="tel"
              placeholder="Phone Number"
              onChange={handleInput}
              name="phone_number"
            />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input
              placeholder="Password"
              name="password"
              onChange={handleInput}
              type="password"
              required
            />
          </Form.Item>

          <Form.Item label="Active" name="active">
            <Select
              showSearch
              placeholder="Is active customer?"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  label: "Yes",
                  value: true,
                  type: "Active",
                },
                {
                  label: "No",
                  value: false,
                  type: "Active",
                },
              ]}
              onSelect={(value, event) => {
                handleSelect(value, event);
              }}
            />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default UpdateEmployee;
