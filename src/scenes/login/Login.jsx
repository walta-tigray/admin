import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Select } from "antd";
import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import baseURL from "../../api_requests/url";
import AuthContext from "../../context/AuthProvider";

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const messages = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth) {
      const { from } = location.state || { from: { pathname: "/" } };
      navigate(from, { replace: true });
    }
  }, []);

  const onFinish = async (value) => {
    setLoading(true);
    try {
      await baseURL({
        url: "/api/v1/admin/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${auth}`,
        },
        data: value,
      })
        .then((res) => {
          const token = res.data.data;
          console.log("token: ", token);
          localStorage.setItem("auth-token", token);
          setAuth(token);
          navigate("/", { replace: true });
          setLoading(false);
        })
        .catch((err) => {
          messages("error", JSON.parse(err.request.responseText).message);
          setLoading(false);
        });
    } catch (err) {
      messages("error", JSON.parse(err.request.responseText).message);
    }
  };
  return (
    <>
      {contextHolder}
      <div
        style={{
          width: "100%",
          background: "#faf8f8",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <div className="login">
          <h3>Login</h3>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Phone Number"
                name="phone_number"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="password"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            {/* <Form.Item
                            name="userType"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select user type!',
                                },
                            ]}
                        >
                            <Select
                                placeholder="user type"
                                allowClear
                            >
                                <Select.Option value="emp">Employee</Select.Option>
                                <Select.Option value="admin">Admin</Select.Option>
                            </Select>
                        </Form.Item> */}
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}
                >
                  Log in
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Login;
