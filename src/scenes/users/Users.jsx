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
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Input, Popconfirm, Spin } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import baseURL from "../../api_requests/url";
import UserDetail from "../../components/UserDetail";
function Users() {
  const [popup, setPopup] = useState(false);
  const [popupButton, setPopupButton] = useState(false);
  const [popupInfo, setPopupInfo] = useState({});

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const sample_users = [
  //     {
  //         user_id: '001sdfu09sdf0923j0f',
  //         full_name: 'John Doe',
  //         phone_number: '0912345678',
  //         createdAt: '5/5/2023',
  //         updatedAt: '5/5/2023',
  //     },
  //     {
  //         user_id: '001sdfu09sdf0923j0f',
  //         full_name: 'Robel Hailu',
  //         phone_number: '0912345678',
  //         createdAt: '5/5/2023',
  //         updatedAt: '5/5/2023',
  //     },
  //     {
  //         user_id: '001sdfu09sdf0923j0f',
  //         full_name: 'Mubarek Seid',
  //         phone_number: '0912345678',
  //         createdAt: '5/5/2023',
  //         updatedAt: '5/5/2023',
  //     },
  // ];

  const [searchQuery, setSearchQuery] = useState("");
  const keys = ["full_name", "phone_number"];

  const search = (items) => {
    return items.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(searchQuery))
    );
  };

  const moreInfo = (data) => {
    setPopupButton(true);
    setPopupInfo(data);
  };

  useEffect(() => {
    baseURL({
      url: "/api/v1/users",
      method: "GET",
    })
      .then((res) => {
        setUsers(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <UserDetail
        trigger={popupButton}
        setTrigger={setPopupButton}
        data={popupInfo}
      />

      <Flex>
        <Breadcrumb
          style={{ padding: 20 }}
          items={[
            {
              title: (
                <>
                  <HomeOutlined />
                  <span onClick={() => navigate("/users")}>Users</span>
                </>
              ),
            },
          ]}
        />
        <Input.Search
          placeholder="search here"
          style={{ width: 304 }}
          onChange={(e) => setSearchQuery(e.target.value)}
          enterButton
        />
      </Flex>

      <Card>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Flex justifyContent="justify-start" spaceX="space-x-2">
            <Title>User</Title>
          </Flex>
          {/* <Button onClick={() => navigate('/add_user')}>Add New</Button> */}
        </div>

        {isLoading ? (
          <div className="loading">
            <Spin />
          </div>
        ) : (
          <Table marginTop="mt-6">
            <TableHead>
              <TableRow>
                <TableHeaderCell>User ID</TableHeaderCell>
                <TableHeaderCell>Full Name</TableHeaderCell>
                <TableHeaderCell>Phone Number</TableHeaderCell>
                <TableHeaderCell>Created at</TableHeaderCell>
                <TableHeaderCell>Updated at</TableHeaderCell>
                <TableHeaderCell>Operation</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {search(users)?.map((item) => (
                <TableRow key={item.user_id}>
                  <TableCell>{item.user_id}</TableCell>
                  <TableCell>{item.full_name}</TableCell>
                  <TableCell>{item.phone_number}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>{item.updatedAt}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex" }}>
                      <Button
                        size="xs"
                        onClick={() => {
                          moreInfo(item);
                        }}
                        importance="secondary"
                        text="More"
                        color="gray"
                      />
                      <Button
                        size="xs"
                        importance="secondary"
                        text="Edit"
                        color="gray"
                      />
                      <Button
                        size="xs"
                        importance="secondary"
                        text="Delete"
                        color="gray"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {/* {customers.map((item) => (
                                <TableRow key={item.customer_id}>
                                    <TableCell>{item.customer_id}</TableCell>
                                    <TableCell>{item.first_name}</TableCell>
                                    <TableCell>{item.last_name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.phone_number}</TableCell>
                                    <TableCell>{item.createdAt}</TableCell>
                                    <TableCell>{item.updatedAt}</TableCell>
                                    <TableCell>
                                        <Button size="xs" importance="secondary" text="More" color="gray" />
                                    </TableCell>
                                </TableRow>
                            ))} */}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}

export default Users;
