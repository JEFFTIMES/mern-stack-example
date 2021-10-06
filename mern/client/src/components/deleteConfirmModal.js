import React from 'react'
import './deleteConfirmModal.css'

function Modal(props) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-top-close-btn-area">
          <button 
            id="btn-close" 
            onClick={ () => {
              props.popupModal(false) 
              props.deleteItem(false)
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
              props.popupModal(false)
              props.deleteItem(false) 
            }}
          >
            Cancel
          </button>
          <button 
            id="btn-confirm"
            onClick={ () => { 
              props.deleteItem(true)
              props.popupModal(false)
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


