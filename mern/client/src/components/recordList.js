import React, { Component, Fragment } from "react";
//import { useState } from 'react'

// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";

//import ModalPopup from './deleteConfirmModal';
import Modal from './deleteConfirmModal'


function Record(props) {
  return (
    <Fragment>
      <tr>
        <td>{props.record.person_name}</td>
        <td>{props.record.person_position}</td>
        <td>{props.record.person_level}</td>
        <td>
          <Link to={"/edit/" + props.record._id}>Edit</Link> |
          <a
            href="/"
            onClick={(event) => {
              
              // dev: checking the _id.
              console.log("id when 'delete' was clicked: ", props.record._id)
              
              // call the Modal. 
              event.preventDefault()
              props.setDeleteRecordId(props.record._id)
              props.setPopupModal(true)

              // props.deleteRecord(props.record._id);
            }}
          >
            Delete
          </a>
        </td>
      </tr>
    </Fragment>
  );
}

export default class RecordList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    
    super(props);

    this.deleteRecord = this.deleteRecord.bind(this);
    this.setPopupModal = this.setPopupModal.bind(this);
    this.setDeleteRecordId = this.setDeleteRecordId.bind(this);
    this.setConfirmDeletion = this.setConfirmDeletion.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);

    this.state = { 
      records: [],
      popupModal: false,
      confirmDeletion: false,
      deleteRecordId: null
    };
  }

  setPopupModal(status){
    this.setState({popupModal : status})
  }

  setDeleteRecordId(id){
    this.setState({deleteRecordId : id})
  }

  setConfirmDeletion(status){
    this.setState({confirmDeletion : status})
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/record/")
      .then((response) => {
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  componentDidUpdate(prevProps, prevState) {
    
    // to understand what is happening when the componentDidUpdate() is called.
    // console.log('prevId: ', prevState.deleteRecordId);
    // console.log('curId: ', this.state.deleteRecordId);
    // console.log('prevConfirm: ', prevState.prevConformDeletion);
    // console.log('curConfirm: ',this.state.confirmDeletion)
    // console.log('prevList: ', prevState.records);
    // console.log('curList: ', this.state.records);

    // the modal return confirm to delete.
    if(this.state.confirmDeletion){

      // delete the record from the database.
      this.deleteRecord(this.state.deleteRecordId);
      
      // update the list of records.
      // I spent 2 days to find out a typo here.
      // the property 'records' misses a 's', so the 'records' state never get changed
      // the RecordList never get updated unless I put a window.location.reload(false) here.
      // It proofs that React only rerenders the changed elements.
      this.setState({
        records: this.state.records.filter((el) => el._id !== this.state.deleteRecordId),
      });

      // reset the deleteRecordId to null and the confirmDeletion to false.
      this.setConfirmDeletion(false)
      this.setDeleteRecordId(null)

    // must check both the prevState.confirmDeletion and the this.state.confirmDeletion together
    // to filter the pattern ( prevState=true && this.state=false)
    // only check the this.state.confirmDeletion could cause collapse of the stack
    // because of looping.
    }else if(!this.state.confirmDeletion && prevState.confirmDeletion){
      
      // otherwise only reset the deleteRecordId to null when the modal returns with cancel.
      this.setDeleteRecordId(null)
      
    }
  }

  // This method will delete a record based on the method
  deleteRecord(id) {

    console.log('Deleting :', id)

    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log('One record deleted.');
    });

    // this.setState({
    //   record: this.state.records.filter((el) => el._id !== id),
    // });
  }

  // This method will map out the users on the table
  recordList() {
    return this.state.records.map((currentRecord) => {
      return (
        <Record
          key={currentRecord._id}
          record={currentRecord}
          setDeleteRecordId={this.setDeleteRecordId}
          setPopupModal={this.setPopupModal}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div className="second-layer">
        { this.state.popupModal && 
          <Modal   
            setPopupModal={this.setPopupModal}  
            setDeleteRecordId={this.setDeleteRecordId}
            setConfirmDeletion={this.setConfirmDeletion}
          /> 
        }
        <h3>Record List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
      </div>
    );
  }
}
