import React, { Component } from "react";
import Student from "../student/student";
import CreateEditStudent from "../student/createEditStudent";
import axios from "axios";

import { CardDeck, Modal, Button } from "react-bootstrap";

import "./students.css";

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      showEdit: false,
      actionType: "Add",
      editStudentData: null
    };
  }

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb() {
    fetch("http://localhost:3001/api/getStudents")
      .then(data => data.json())
      .then(res => this.setState({ students: res.data }));
  }

  handleClose() {
    this.setState({ showEdit: false });
  }

  handleShow() {
    this.setState({ showEdit: true });
  }

  handleDelete(student) {
    let objIdToDelete = null;
    this.state.students.forEach(dat => {
      if (dat.id === student.id) {
        objIdToDelete = dat.id;
      }
    });

    axios
      .delete("http://localhost:3001/api/deleteStudent", {
        data: {
          id: objIdToDelete
        }
      })
      .then(res => {
        this.getDataFromDb();
        // alert("deleted");
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleAddStudent() {
    this.setState({ showEdit: true, actionType: "Add", editStudentData: null });
  }
  handleEditStudent(student) {
    this.setState({
      showEdit: true,
      actionType: "Edit",
      editStudentData: student
    });
  }

  addStudent(details) {
    let currentIds = this.state.students.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios
      .post("http://localhost:3001/api/putStudent", {
        firstName: details.firstName,
        lastName: details.lastName,
        hobbies: details.hobbies,
        photo: details.photo,
        birthDate: details.birthDate,
        id: idToBeAdded
      })
      .then(res => {
        this.handleClose();
        this.getDataFromDb();
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateStudent(details) {
    let objIdToUpdate = null;
    this.state.students.forEach(dat => {
      if (dat.id === details.id) {
        objIdToUpdate = dat.id;
      }
    });

    axios
      .post("http://localhost:3001/api/updateStudent", {
        id: objIdToUpdate,
        update: {
          firstName: details.firstName,
          lastName: details.lastName,
          birthDate: details.birthDate,
          hobbies: details.hobbies,
          photo: details.photo
        }
      })
      .then(res => {
        this.handleClose();
        this.getDataFromDb();
        //alert("student data updated");
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleCreateEdit(details) {
    let actionType = this.state.actionType;
    if (actionType === "Add") {
      this.addStudent(details);
    } else {
      this.updateStudent(details);
    }
  }
  searchStudents(e) {
    const searchKey = e.target.value ? e.target.value : null;
    fetch("http://localhost:3001/api/searchStudents/" + searchKey)
      .then(data => data.json())
      .then(res => this.setState({ students: res.data }));
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
              <li className="nav-item active" />
              <li className="nav-item" />
              <li className="nav-item" />
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search Students"
                aria-label="Search"
                onChange={this.searchStudents.bind(this)}
              />
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
                <div key={student._id}>
                  <Student
                    card={student}
                    handleClose={() => this.handleClose()}
                    handleShow={student => this.handleEditStudent(student)}
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
              student={this.state.editStudentData}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Students;
