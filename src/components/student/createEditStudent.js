import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

class CreateEditStudent extends Component {
  render() {
    return (
      <div>
        <form id="contact-form" class="form-horizontal">
          <fieldset>
            <div id="form-container">
              <div class="form-group">
                <label class="col-md-3 control-label" for="firstName">
                  First Name
                </label>
                <div class="col-md-9">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Student first name"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="col-md-3 control-label" for="lastName">
                  Last Name
                </label>
                <div class="col-md-9">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Student last name"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="col-md-3 control-label" for="birthDate">
                  Date Of Birth
                </label>
                <div class="col-md-9">
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="text"
                    placeholder="Student birth date"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="col-md-3 control-label" for="hobbies">
                  Hobbies
                </label>
                <div class="col-md-9">
                  <textarea
                    class="form-control"
                    id="hobbies"
                    name="hobbies"
                    placeholder="Please enter student hobbies here..."
                    rows="5"
                  />
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
