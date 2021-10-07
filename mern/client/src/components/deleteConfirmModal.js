import React from 'react'
import './deleteConfirmModal.css'
// import { useEffect } from 'react'


function Modal(props) {

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-top-close-btn-area">
          <button 
            id="btn-close" 
            onClick={ () => {

              // dev: checking the _id. 
              console.log('CLOSE clicked: ', props.deleteRecordId)
              
              props.setPopupModal(false) 
              props.setConfirmDeletion(false)
              // props.setDeleteRecordId(null)
            }}
          > 
            X 
          </button>
        </div>
        <div className="modal-header">
          <h2>Are you sure you want to delete the item?</h2>
        </div>
        <div className="modal-body">
          <p>Warning: If you confirm the deletion, you will lost the item forever.</p>
        </div>
        <div className="modal-footer">
          <button 
            id="btn-cancel" 
            onClick={ () => {

              // dev: checking the _id. 
              console.log('CANCEL clicked: ', props.deleteRecordId)

              props.setPopupModal(false)
              props.setConfirmDeletion(false)
              // props.setDeleteRecordId(null) 
            }}
          >
            Cancel
          </button>
          <button 
            id="btn-confirm"
            onClick={ () => {
              
              // dev: checking the _id. 
              // console.log('CONFIRM clicked: ', props.deleteRecordId)

              // setting deleteRecordId to null and toggle the modal off.
              props.setPopupModal(false)
              props.setConfirmDeletion(true)             
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal


