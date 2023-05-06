import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import baseURL from '../../api_requests/url';

function AddNewWarehouse() {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const [loading, setLoading] = useState(false);
    const [warehouse, setWarehouse] = useState({
        warehouse: ""
    });
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const messages = (type, content) => {
        messageApi.open({
            type: type,
            content: content,
        });
    };

    const handleInput = (e) => {
        setWarehouse({
            warehouse: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        try {
            await baseURL({
                url: "/api/v1/warehouse/create",
                method: 'POST',
                data: {
                    warehouse_name: warehouse.warehouse
                }
            })
                .then(res => {
                    if (res.request.status === 200)
                        messages('success', 'warehouse added successfully');
                    setLoading(false);
                })
                .catch(err => {
                    messages('error', JSON.parse(err.request.responseText).message);
                    setLoading(false);
                })
        }
        catch (err) {
            messages('error', JSON.parse(err.request.responseText).message);
        }
        form.resetFields();
    }
    const buttonItemLayout =
        formLayout === 'horizontal'
            ? {
                wrapperCol: {
                    span: 14,
                    offset: 4,
                },
            }
            : null;
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
                                <span onClick={() => navigate('/warehouses')}>Warehouse</span>
                            </>
                        ),
                    },
                    {
                        title: (
                            <>
                                <HomeOutlined />
                                <span onClick={() => navigate('/add_warehouse')}>Add New Warehouse</span>
                            </>
                        ),
                    },
                ]}
            />
            <Form
                form={form}
                onFinish={handleSubmit}
                style={{
                    maxWidth: 400,
                }}
            >

                <Form.Item label="Warehouse" name="warehouse_name">
                    <Input placeholder="Warehouse Name"
                        onChange={handleInput}
                        required />
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AddNewWarehouse