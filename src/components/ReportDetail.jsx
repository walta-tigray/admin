import React from "react";
import { Descriptions } from "antd";
import CancelIcon from "@mui/icons-material/Cancel";
import DescriptionsItem from "antd/es/descriptions/Item";

function ReportDetail({ trigger, setTrigger, data }) {
  return trigger ? (
    <div className="popup__container">
      <div className="popup__inner">
        <button className="popup__close__btn" onClick={() => setTrigger(false)}>
          {" "}
          {<CancelIcon />}
        </button>

        <Descriptions column={1} title="Report Detail">
          <Descriptions.Item label="Report ID">
            {data?.report_id}
          </Descriptions.Item>
          <Descriptions.Item label="Reborted By">
            {data?.createdBy}
          </Descriptions.Item>
          <Descriptions.Item label="Report Type">
            {data?.type}
          </Descriptions.Item>
          <Descriptions.Item label="Report Description">
            {data?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Report Status">
            {data?.status}
          </Descriptions.Item>
          <Descriptions.Item label="Location">
            {data?.latitude + ", " + data?.longitude}
          </Descriptions.Item>
          <DescriptionsItem label="Region">{data?.region}</DescriptionsItem>
          <DescriptionsItem label="Zone">{data?.zone}</DescriptionsItem>
          <DescriptionsItem label="Wereda">{data?.wereda}</DescriptionsItem>
          <DescriptionsItem label="Kebele">{data?.kebele}</DescriptionsItem>
          <DescriptionsItem label="Region">{data?.region}</DescriptionsItem>
          <Descriptions.Item label="Address">{data?.address}</Descriptions.Item>
          <Descriptions.Item label="Incident Time">
            {data?.createdAt}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ReportDetail;
