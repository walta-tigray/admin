import React from 'react'
import { Descriptions } from 'antd';
import CancelIcon from '@mui/icons-material/Cancel';

function OrderDetail({ trigger, setTrigger, data }) {
    return (trigger) ? (
        <div className='popup__container'>
            <div className="popup__inner">
                <button className='popup__close__btn'
                    onClick={() => setTrigger(false)}> {<CancelIcon />}</button>

                <Descriptions title="Order Detail">
                    <Descriptions.Item label="Order ID">{data?.order_id}</Descriptions.Item>
                    <Descriptions.Item label="Customer">{data?.first_name}</Descriptions.Item>
                    <Descriptions.Item label="Product">{data?.product_name}</Descriptions.Item>
                    <Descriptions.Item label="Amount">{data?.amount}</Descriptions.Item>
                    <Descriptions.Item label="Category">{data?.category_name}</Descriptions.Item>
                    <Descriptions.Item label="Status">{data?.status}</Descriptions.Item>
                    <Descriptions.Item label="Created at">{data?.createdAt}</Descriptions.Item>
                    <Descriptions.Item label="updated at">{data?.updatedAt}</Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    ) : "";
}

export default OrderDetail