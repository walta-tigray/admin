import React, { useEffect } from "react";
import { Descriptions } from "antd";
import CancelIcon from "@mui/icons-material/Cancel";
import DescriptionsItem from "antd/es/descriptions/Item";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Marker } from 'react-map-gl';

function ReportDetail({ trigger, setTrigger, data }) {

  mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_TOKEN;

  useEffect(() => {
    if (trigger) {
      const map = new mapboxgl.Map({
        container: "mymap",
        style: "mapbox://styles/mapbox/streets-v11",
        zoom: 7,
        center: [data.longitude, data.latitude]
      });
      // Create a new marker and set color.
      const marker = new mapboxgl.Marker({
        color: "#051221",
      }).setLngLat([data.longitude, data.latitude])
        .addTo(map);
    }
  }, [data])

  return trigger ? (
    <div className="popup__container" style={{ overflow: "auto", height: "100vh", paddingTop: "50vh" }}>
      <div className="popup__inner">
        <button className="popup__close__btn" onClick={() => setTrigger(false)}>
          {" "}
          {<CancelIcon />}
        </button>

        <div id="mymap" style={{ height: 200, width: "100%" }} />

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
