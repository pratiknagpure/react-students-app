import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

class Student extends Component {
  render() {
    const { card } = this.props;

    return (
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
          <Button variant="primary">Edit</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Student;
