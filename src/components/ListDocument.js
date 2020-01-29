import React, { Component } from 'react';
import DocumentService from '../services/DocumentService';
import { Link } from 'react-router-dom';


let centerAlign = {
  marginTop : "8%",
  width:"100px"
}

class ListDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {   };
    this.addDocumentService = new DocumentService();
  }

  render() {
    return (
      <div className="row justify-content-md-center">
      <div className="col-md-4 form-back success-page text-center">
      You can now collect your badge from Admin.<br></br>
          <Link to={"/"} ><button className="btn btn-success" style={centerAlign}> Ok</button></Link>
      </div>     
       </div>        
    );
  }
}

export default ListDocument;
