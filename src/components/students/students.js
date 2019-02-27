import React, { Component } from "react";
import Student from "../student/student";
import CreateEditStudent from "../student/createEditStudent";

import { CardDeck, Modal, Button } from "react-bootstrap";

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
        {
          firstName: "Harvey",
          lastName: "Specter",
          since: "",
          photo: "",
          hobbies: ""
        },
        {
          firstName: "Michel",
          lastName: "Ross",
          since: "",
          photo: "",
          hobbies: ""
        },
        {
          firstName: "Dona",
          lastName: "Paulsan",
          since: "",
          photo: "",
          hobbies: ""
        },
        {
          firstName: "Rachel",
          lastName: "Zane",
          since: "",
          photo: "",
          hobbies: ""
        }
      ],
      showEdit: false
    };
  }
  handleClose() {
    this.setState({ showEdit: false });
  }

  handleShow() {
    this.setState({ showEdit: true });
  }
  render() {
    return (
      <div>
        <h1>Students</h1>
        <CardDeck>
          {this.state.students.map(student => (
            <Student
              card={student}
              handleClose={() => this.handleClose()}
              handleShow={() => this.handleShow()}
            />
          ))}
        </CardDeck>
        <Modal show={this.state.showEdit} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateEditStudent />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose.bind(this)}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose.bind(this)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Students;
