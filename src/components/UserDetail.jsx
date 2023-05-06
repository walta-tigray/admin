import React from 'react'
import { Descriptions } from 'antd';
import CancelIcon from '@mui/icons-material/Cancel';

function UserDetail({ trigger, setTrigger, data }) {
    return (trigger) ? (
        <div className='popup__container'>
            <div className="popup__inner">
                <button className='popup__close__btn'
                    onClick={() => setTrigger(false)}> {<CancelIcon />}</button>

                <Descriptions title="User Detail">
                    <Descriptions.Item label="User ID">{data?.user_id}</Descriptions.Item>
                    <Descriptions.Item label="Id Type">{data?.product_price}</Descriptions.Item>
                    <Descriptions.Item label="Id Number">{data?.product_amount}</Descriptions.Item>
                    <Descriptions.Item label="Front Id">{data?.category_name}</Descriptions.Item>
                    <Descriptions.Item label="Back Id">{data?.product_description}</Descriptions.Item>
                    <Descriptions.Item label="User Image">{data?.product_name}</Descriptions.Item>
                    <Descriptions.Item label="Full Name">{data?.full_name}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">{data?.phone_number}</Descriptions.Item>
                    <Descriptions.Item label="Contact One">{data?.product_name}</Descriptions.Item>
                    <Descriptions.Item label="Contact Two">{data?.product_name}</Descriptions.Item>
                    <Descriptions.Item label="Contact Three">{data?.product_name}</Descriptions.Item>
                    <Descriptions.Item label="Active">{data?.product_name}</Descriptions.Item>
                    <Descriptions.Item label="Role">{data?.product_name}</Descriptions.Item>
                    <Descriptions.Item label="Created at">{data?.createdAt}</Descriptions.Item>
                    <Descriptions.Item label="updated at">{data?.updatedAt}</Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    ) : "";
}

export default UserDetail