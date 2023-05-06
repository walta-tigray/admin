import React, { useState, useEffect } from 'react'
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
} from '@tremor/react';
import { useNavigate } from 'react-router-dom'
import { Badge, Breadcrumb, Input, Popconfirm, Spin } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import baseURL from '../../api_requests/url';
import ReportDetail from '../../components/ReportDetail';

const colors = {
    "solved": 'green',
    'new': 'red',
    'in progress': 'yellow',
};

// const sample_reports = [
//     {
//         report_id: '001sdfu09sdf0923j0x',
//         victim: 'Victim A',
//         report_type: 'Sample-A',
//         report_address: 'kebele-01',
//         status: 'solved',
//         createdAt: '5/5/2023',
//     },
//     {
//         report_id: '001sdfu09sdf0923j0f',
//         victim: 'Victim B',
//         report_type: 'Sample-A',
//         report_address: 'kebele-01',
//         status: 'new',
//         createdAt: '5/5/2023',
//     },
//     {
//         report_id: '001sdfu09sdf0923j0s',
//         victim: 'Victim C',
//         report_type: 'Sample-A',
//         report_address: 'kebele-01',
//         status: 'in progress',
//         createdAt: '5/5/2023',
//     },
// ];

function Reports() {

    const [popup, setPopup] = useState(false);
    const [popupButton, setPopupButton] = useState(false);
    const [popupInfo, setPopupInfo] = useState({});

    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");
    const keys = ["report_id", "report_address"];

    const search = (items) => {
        return items.filter(item =>
            keys.some(key => item[key].toLowerCase().includes(searchQuery)))
    }

    const moreInfo = (data) => {
        setPopupButton(true);
        setPopupInfo(data)
    }

    useEffect(() => {
        baseURL({
            url: '/api/v1/reports',
            method: 'GET',
        })
            .then(res => {
                setReports(res.data.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
    }, [])

    return (
        <div>
            <ReportDetail
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
                                    <span onClick={() => navigate('/reports')}>Reports</span>
                                </>
                            ),
                        }
                    ]}
                />
                <Input.Search
                    placeholder="search here"
                    style={{ width: 304 }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    enterButton />
            </Flex>

            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Flex justifyContent="justify-start" spaceX="space-x-2">
                        <Title>Reports</Title>
                    </Flex>
                </div>

                {isLoading ? <div className="loading">
                    <Spin />
                </div> : (
                    <Table marginTop="mt-6">
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Report ID</TableHeaderCell>
                                <TableHeaderCell>Victim</TableHeaderCell>
                                <TableHeaderCell>Report Type</TableHeaderCell>
                                <TableHeaderCell>Report Address</TableHeaderCell>
                                <TableHeaderCell>Report Status</TableHeaderCell>
                                <TableHeaderCell>Created At</TableHeaderCell>
                                <TableHeaderCell>Operation</TableHeaderCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {search(reports)?.map((item) => (
                                <TableRow key={item.report_id}>
                                    <TableCell>{item.report_id}</TableCell>
                                    <TableCell>{item.createdBy}</TableCell>
                                    <TableCell>{item.report_type}</TableCell>
                                    <TableCell>{item.report_address}</TableCell>
                                    <TableCell>{item.report_status}</TableCell>
                                    <TableCell>{item.createdAt}</TableCell>
                                    <TableCell>
                                        <Badge color={colors[item.report_status]} text={item.report_status} size="xs" />
                                    </TableCell>

                                    <TableCell>
                                        <div style={{ display: 'flex' }}>
                                            <Button size="xs" onClick={() => { moreInfo(item) }} importance="secondary" text="More" color="gray" />
                                            <Button size="xs" importance="secondary" text="Edit" color="gray" />
                                            <Button size="xs" importance="secondary" text="Delete" color="gray"
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
                    </Table>)}
            </Card>
        </div>
    )
}

export default Reports