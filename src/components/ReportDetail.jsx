import React from 'react'
import { Descriptions } from 'antd';
import CancelIcon from '@mui/icons-material/Cancel';

function ReportDetail({ trigger, setTrigger, data }) {
    return (trigger) ? (
        <div className='popup__container'>
            <div className="popup__inner">
                <button className='popup__close__btn'
                    onClick={() => setTrigger(false)}> {<CancelIcon />}</button>

                <Descriptions column={1} title="Report Detail">
                    <Descriptions.Item label="Report ID">{data?.report_id}</Descriptions.Item>
                    <Descriptions.Item label="Victim">{data?.createdBy}</Descriptions.Item>
                    <Descriptions.Item label="Report Type">{data?.report_type}</Descriptions.Item>
                    <Descriptions.Item label="Report Description">{data?.report_description}</Descriptions.Item>
                    <Descriptions.Item label="Report Status">{data?.report_status}</Descriptions.Item>
                    <Descriptions.Item label="Report Image">{data?.report_image}</Descriptions.Item>
                    <Descriptions.Item label="Report Video">{data?.report_video}</Descriptions.Item>
                    <Descriptions.Item label="Report Audio">{data?.report_audio}</Descriptions.Item>
                    <Descriptions.Item label="Location">{data?.report_latitude + ', ' + data?.report_longitude}</Descriptions.Item>
                    <Descriptions.Item label="Place">{data?.report_state + ', ' + data?.report_city + ', ' + data?.report_address}</Descriptions.Item>
                    <Descriptions.Item label="Incident Time">{data?.createdAt}</Descriptions.Item>
                </Descriptions>
            </div>
        </div>
    ) : "";
}

export default ReportDetail