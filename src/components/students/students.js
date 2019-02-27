import React, { Component } from "react";
import Student from "../student/student";

import { CardDeck } from "react-bootstrap";

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
      ]
    };
  }
  render() {
    return (
      <div>
        <h1>Students</h1>
        <CardDeck>
          {this.state.students.map(student => (
            <Student card={student} />
          ))}
        </CardDeck>
      </div>
    );
  }
}

export default Students;
