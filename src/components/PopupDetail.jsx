import React, { useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

function PopupDetail({ trigger, setTrigger, data }) {
  return trigger ? (
    <div className="popup__container">
      <div className="popup__inner">
        <button className="popup__close__btn" onClick={() => setTrigger(false)}>
          {" "}
          {<CancelIcon />}
        </button>

        <h3 className="popup__header">Product detail</h3>

        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <th>Product Name:</th>
              <td>{data.product_name}</td>
            </tr>
            <tr>
              <th>Description:</th>
              <td>{data.product_description}</td>
            </tr>
            <tr>
              <th>Price:</th>
              <td>{data.product_price} ETB</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopupDetail;
