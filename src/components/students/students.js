import React, { Component } from "react";
import Student from "../student/student";
import CreateEditStudent from "../student/createEditStudent";

import { CardDeck, Modal, Button } from "react-bootstrap";

import "./students.css";

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
      showEdit: false,
      actionType: "Add"
    };
  }
  handleClose() {
    this.setState({ showEdit: false });
  }

  handleShow() {
    this.setState({ showEdit: true });
  }

  handleDelete(student) {
    const filtered = this.state.students.filter(std => {
      return std.firstName !== student.firstName;
    });
    this.setState({
      students: filtered
    });
  }

  handleAddStudent() {
    this.setState({ showEdit: true, actionType: "Add" });
  }
  handleEditStudent() {
    this.setState({ showEdit: true, actionType: "Edit" });
  }

  handleCreateEdit(details) {
    const students = [...this.state.students, details];
    this.setState({
      students
    });
    this.handleClose();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a className="navbar-brand" href="nav/">
            Students
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="link">
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="hjk" />
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  href="kl"
                  tabIndex="-1"
                  aria-disabled="true"
                />
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search Students"
                aria-label="Search"
              />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
        <section className="student_sec">
          <div className="container">
            <div className="add-student row">
              <Button
                className="btn btn-lg btn-primary  float-left"
                onClick={this.handleAddStudent.bind(this)}
              >
                Add
              </Button>
            </div>

            <CardDeck>
              {this.state.students.map(student => (
                <div key={student.firstName}>
                  <Student
                    card={student}
                    handleClose={() => this.handleClose()}
                    handleShow={() => this.handleEditStudent()}
                    handleDelete={student => this.handleDelete(student)}
                    actionType={this.state.actionType}
                  />
                </div>
              ))}
            </CardDeck>
          </div>
        </section>

        <Modal show={this.state.showEdit} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.actionType} Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateEditStudent
              handleCreateEdit={details => this.handleCreateEdit(details)}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Students;
