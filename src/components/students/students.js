import React, { Component } from "react";
import Student from "../student/student";

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [
        { name: "st1" },
        { name: "st2" },
        { name: "st3" },
        { name: "st4" }
      ]
    };
  }
  render() {
    return (
      <div>
        <h1>Students</h1>
        {this.state.students.map(() => (
          <Student />
        ))}
      </div>
    );
  }
}

export default Students;
