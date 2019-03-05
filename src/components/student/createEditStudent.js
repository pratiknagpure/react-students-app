import React, { Component } from "react";

class CreateEditStudent extends Component {
  constructor(props) {
    super(props);
    const student = props.student;
    if (student) {
      this.state = student;
    } else {
      this.state = {
        firstName: "",
        lastName: "",
        birthDate: "",
        hobbies: ""
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.student);
  }

  handleFieldChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const details = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      birthDate: this.state.birthDate,
      hobbies: this.state.hobbies
    };
    this.props.handleCreateEdit(details);
  }

  render() {
    return (
      <div>
        <form id="contact-form" className="form-horizontal">
          <fieldset>
            <div id="form-container">
              <div className="form-group">
                <label className="col-md-3 control-label" htmlFor="firstName">
                  First Name
                </label>
                <div className="col-md-9">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Student first name"
                    className="form-control"
                    value={this.state.firstName}
                    onChange={this.handleFieldChange.bind(this)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-3 control-label" htmlFor="lastName">
                  Last Name
                </label>
                <div className="col-md-9">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Student last name"
                    className="form-control"
                    value={this.state.lastName}
                    onChange={this.handleFieldChange.bind(this)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-3 control-label" htmlFor="birthDate">
                  Birth Date
                </label>
                <div className="col-md-9">
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    placeholder="Student birth date"
                    className="form-control"
                    value={this.state.birthDate}
                    onChange={this.handleFieldChange.bind(this)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="col-md-3 control-label" htmlFor="hobbies">
                  Hobbies
                </label>
                <div className="col-md-9">
                  <textarea
                    className="form-control"
                    id="hobbies"
                    name="hobbies"
                    placeholder="Please enter student hobbies here..."
                    rows="5"
                    value={this.state.hobbies}
                    onChange={this.handleFieldChange.bind(this)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label" htmlFor="photo">
                  Photo
                </label>
                <div className="col-md-9">
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    placeholder="Upload photo"
                    className="form-control"
                    value={this.state.photo}
                    onChange={this.handleFieldChange.bind(this)}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="col-md-12 text-right" id="spin-area">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    onClick={this.handleSubmit.bind(this)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default CreateEditStudent;
