import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

import "./student.css";

class Student extends Component {
  render() {
    const { card } = this.props;

    return (
      <div className="student-card">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>
              {card.firstName} {card.lastName}
            </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button
              className="edit_btns"
              variant="primary"
              onClick={() => this.props.handleShow()}
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
