import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

import "./student.css";

class Student extends Component {
  render() {
    const { card } = this.props;

    return (
      <div className="student-card">
        <Card style={{ width: "18rem" }}>
          <Card.Img
            style={{ width: "18rem", height: "14rem" }}
            variant="top"
            src={card.photo}
          />
          <Card.Body>
            <Card.Title>
              {card.firstName} {card.lastName}
            </Card.Title>
            <Card.Text>
              DOB :{card.birthDate}
              <br />
              {card.hobbies}
            </Card.Text>
            <Button
              className="edit_btns"
              variant="primary"
              onClick={() => this.props.handleShow(this.props.card)}
            >
              Edit
            </Button>
            <Button
              variant="primary"
              onClick={() => this.props.handleDelete(this.props.card)}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Student;
