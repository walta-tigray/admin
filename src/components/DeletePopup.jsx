import React, { useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';

function DeletePopup({ trigger, setTrigger, deleteHandler }) {

  return (trigger) ? (
    <div className='popup__container'>
      <div className="popup__inner">
        <button className='popup__close__btn'
          onClick={() => setTrigger(false)}> {<CancelIcon />}</button>

        <div className="popup_dialog">

          <h3>Are you sure you want to delete? </h3>

          <div className="popup__delete__choice">
            <button className='yes__button' onClick={() => {
              deleteHandler(true);
              setTrigger(false)
            }}>Yes</button>
            <button className='no__button' onClick={() => {
              deleteHandler(false);
              setTrigger(false)
            }}>No</button>
          </div>
        </div>
      </div>
    </div >
  ) : "";
}

export default DeletePopup