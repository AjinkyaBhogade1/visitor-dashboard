import React, { useState } from 'react';
import DocumentService from '../services/DocumentService';

let styles = {
  marginTop: '50px'
};

let centerAlign = {
  marginLeft: "40%",
  marginTop: "3%"
}

class AddDocument extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: "",
      mobileNo: "",
      idProof: "",
      idProofType: "",
      contactPersonName: "",
      contactPersonEmail: "",
      reasonForVisit: "",
      contactPersonMobileNo: "",
      visitorType: ""
      // errordata:{"isServerError" : false,
      // "errorMsg":''}

    }
   
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.target.classList.add('active');

    this.setState({
      [e.target.name]: e.target.value
    });

    this.showInputError(e.target.name);
  }

  handleSubmit(e) {
   // e.preventDefault();
    console.log('component state', JSON.stringify(this.state));

    if (!this.showFormErrors()) {
      return true;
      console.log('form is invalid: do not submit');
    } else {
      return false;
      console.log('form is valid: submit');
    }
  }


  showFormErrors() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;
    inputs.forEach(input => {
      input.classList.add('active');
      const isInputValid = this.showInputError(input.name);
      if (!isInputValid) {
        isFormValid = false;
      }
    });
    return isFormValid;
  }

  showInputError(refName) {
    const validity = this.refs[refName].validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
    const isPassword = refName.indexOf('password') !== -1;
    const isPasswordConfirm = refName === 'passwordConfirm';

    if (isPasswordConfirm) {
      if (this.refs.password.value !== this.refs.passwordConfirm.value) {
        this.refs.passwordConfirm.setCustomValidity('Passwords do not match');
      } else {
        this.refs.passwordConfirm.setCustomValidity('');
      }
    }

    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`;
      } else if (validity.typeMismatch) {
        error.textContent = `${label} should be a valid email address`;
      } else if (isPassword && validity.patternMismatch) {
        error.textContent = `${label} should be longer than 4 chars`;
      } else if (isPasswordConfirm && validity.customError) {
        error.textContent = 'Passwords do not match';
      } else if (validity.minLength) {
        error.textContent = `${label} should be no longer than 10 dight`;
      }
      return false;
    }
    error.textContent = '';
    return true;
  }

  addDoc = (e) => {
    e.preventDefault();
    console.log(this.state);
    let resError = this.handleSubmit();
    DocumentService.postApi('addVisitor', this.state)
      .then(json => {
        console.log(json);
        if (json.status == 200) {
          this.props.history.push('/success')
        }
        else {
          this.state.showErr = true;
        }
      }).catch((error) => {
        console.log(resError);
        let errorData = {"isServerError" : true,
                    "errorMsg":resError ? 'Please Enter Valid Details' : error.response.data.message
        }        
        this.setState(errorData);      
        console.log("error-----------", error)
       
      })
  }

  render() {
    let { isQuestEmp } = this.state;
    if (this.state.visitorType === "Employee") {
      isQuestEmp = true
    }

    const renderNameField = () => {
      if (!isQuestEmp) {
        return <div className="form-group">
          <label id="nameLabel">Name</label>
          <input className="form-control"
            type="text"
            name="name"
            ref="name"
            placeholder="Enter your name"
            value={this.state.name}
            onChange={this.handleChange}
            required />
          <div className="error" id="nameError" /></div>
      }
    }

    const renderAuthButton = () => {
      if (!isQuestEmp) {
        return <div> <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label for="sel2">Id Proof Type</label>
              <select name="idProofType" className="form-control" id="sel2" onChange={this.handleChange} value={this.state.idProofType} >
                <option>Pan Card</option>
                <option>Adhaard card</option>
                <option>Driving Licean</option>
                <option>Other</option>
              </select>
              <div className="error" id="idProofTypeError" />

            </div>
          </div>

          <div className="col-md-6"><div className="form-group">
            <label id="idProofLabel">Id Proof</label>
            <input className="form-control"
              type="text"
              name="idProof"
              ref="idProof"
              placeholder="Enter your Id Proof"
              value={this.state.idProof}
              onChange={this.handleChange}
              required />
            <div className="error" id="idProofError" />
          </div>   </div>
        </div>

          <div className="form-group">
            <label id="contactPersonNameLabel">Contact Person Name</label>
            <input className="form-control"
              type="text"
              name="contactPersonName"
              ref="contactPersonName"
              placeholder="Enter your contact Person Name"
              value={this.state.contactPersonName}
              onChange={this.handleChange}
              required />
            <div className="error" id="contactPersonNameError" />
          </div>

          <div className="row">
            <div className="col-md-6 form-group">
              <label id="contactPersonMobileNoLabel">Contact Person Mobile No</label>
              <input className="form-control"
                type="text"
                name="contactPersonMobileNo"
                ref="contactPersonMobileNo"
                placeholder="Enter your contact Person MobileNo"
                value={this.state.contactPersonMobileNo}
                onChange={this.handleChange}
                required />
              <div className="error" id="contactPersonMobileNoError" />
            </div>
            <div className="form-group col-md-6">
              <label id="contactPersonEmailLabel">Contact Person Email</label>
              <input className="form-control"
                type="email"
                name="contactPersonEmail"
                ref="contactPersonEmail"
                placeholder="Enter your contact Person Email"
                value={this.state.contactPersonEmail}
                onChange={this.handleChange}
                required />
              <div className="error" id="contactPersonEmailError" />
            </div></div>

          <div className="form-group">
            <label id="reasonForVisitLabel">Reason For Visit</label>
            <input className="form-control"
              type="text"
              name="reasonForVisit"
              ref="reasonForVisit"
              placeholder="Enter your Reason For Visit"
              value={this.state.reasonForVisit}
              onChange={this.handleChange}
              required />
            <div className="error" id="reasonForVisitError" />
          </div>  </div>
      } else {
        return null;
      }
    }
    return (
      <div>
        <div style={styles}>
          <div className="row justify-content-md-center ">
            <div className="col-md-5 form-back">
              <h2 className="text-center ">Visitor Registration</h2><br></br>
              <form novalidate>
                {this.state.isServerError ? (<div className="serverError serverErrorBox">{this.state.errorMsg}</div>) : null}
                <div className="form-group">
                  <label for="sel1">Visitor Type</label>
                  <select name="visitorType" className="form-control" id="sel1" onChange={this.handleChange} value={this.state.visitorType} >
                    <option>Client</option>
                    <option>Vendor</option>
                    <option>Interview/Walk-in</option>
                    <option>Employee</option>
                  </select>
                </div>

                {renderNameField()}
                <div className="row">
                  <div className="col-md-6"><div className="form-group">
                    <label id="emailLabel">Email</label>
                    <input className="form-control"
                      type="email"
                      name="email"
                      ref="email"
                      placeholder="Enter your Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      required />
                    <div className="error" id="emailError" />
                  </div>   </div>
                  <div className="col-md-6"> <div className="form-group">
                    <label id="mobileNoLabel">Mobile No</label>
                    <input className="form-control"
                      type="number"
                      name="mobileNo"
                      ref="mobileNo"
                      placeholder="Enter your Mobile No"
                      value={this.state.mobileNo}
                      onChange={this.handleChange}
                      required />
                    <div className="error" id="mobileNoError" />
                  </div></div></div>

                {renderAuthButton()}
                <button type="submit" onClick={this.addDoc} className="btn btn-primary" style={centerAlign}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddDocument;