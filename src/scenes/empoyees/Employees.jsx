import React, { useState, useEffect } from "react";
import {
  Card,
  Title,
  Flex,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Button,
} from "@tremor/react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, message, Spin, Popconfirm } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import baseURL from "../../api_requests/url";
import DeletePopup from "../../components/DeletePopup";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

function Employees() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [popup, setPopup] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [messageApi, contextHolder] = message.useMessage();
  const messages = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  useEffect(() => {
    baseURL({
      url: "/api/v1/admin/all",
      method: "GET",
    })
      .then((res) => {
        setEmployee(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [refresh]);

  const popupDisplay = (id) => {
    setPopup(true);
    employee.current = id;
  };

  const deleteHandler = (employee_id) => {
    try {
      baseURL({
        method: "DELETE",
        url: `/api/v1/admin/delete/${employee_id}`,
      })
        .then((res) => {
          if (res.request.status === 200) {
            messages("success", "employee deleted successfully");
            refresh ? setRefresh(false) : setRefresh(true);
          }
        })
        .catch((err) => {
          messages("error", JSON.parse(err.request.responseText).message);
        });
    } catch (err) {
      messages("error", JSON.parse(err.request.responseText).message);
    }
  };

  return (
    <div>
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
        ]}
      />
      <DeletePopup
        trigger={popup}
        setTrigger={setPopup}
        deleteHandler={deleteHandler}
      />

      <Card>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Flex justifyContent="justify-start" spaceX="space-x-2">
            <Title>Employees</Title>
          </Flex>
          <Button onClick={() => navigate("/add_employee")}>Add New</Button>
        </div>
        {isLoading ? (
          <div className="loading">
            <Spin />
          </div>
        ) : (
          <Table marginTop="mt-6">
            <TableHead>
              <TableRow>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>First Name</TableHeaderCell>
                <TableHeaderCell>Last Name</TableHeaderCell>
                <TableHeaderCell>Company Email</TableHeaderCell>
                <TableHeaderCell>Phone Number</TableHeaderCell>
                <TableHeaderCell>Created at</TableHeaderCell>
                <TableHeaderCell>Updated at</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {employee.map((item) => (
                <TableRow key={item.employee_id}>
                  <TableCell>{item.employee_id}</TableCell>
                  <TableCell>{item.first_name}</TableCell>
                  <TableCell>{item.last_name}</TableCell>
                  <TableCell>{item.company_email}</TableCell>
                  <TableCell>{item.phone_number}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>{item.updatedAt}</TableCell>
                  <TableCell>
                    <div
                      className="table__button"
                      style={{ justifyContent: "space-evenly" }}
                    >
                      <Link
                        to="/update_employee"
                        state={{
                          employee_id: item.employee_id,
                        }}
                      >
                        <Button
                          size="xs"
                          importance="secondary"
                          text="Edit"
                          color="gray"
                        />
                      </Link>
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this order?"
                        onConfirm={() => {
                          deleteHandler(item.employee_id);
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          size="xs"
                          importance="secondary"
                          text="Delete"
                          color="gray"
                        />
                      </Popconfirm>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}

export default Employees;
