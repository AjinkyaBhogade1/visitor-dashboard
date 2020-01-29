import React from 'react';
import {Link} from 'react-router-dom';

let centerAlign = {
  marginLeft: "45%",
  marginTop : "5%"
}

let topAlign = {
  marginTop : "3%"
}

class AddDoc extends React.Component{
render() {
    return (
    <div >
      <h6 className="text-color"> Welcome to QuEST Global</h6>
      <ul style={topAlign}>
  <li className="subText-color" >You will have to register your details to get the entry in QuEST office.</li>
  <li className="subText-color"> Once registration is done you will receive the temporary ID card from Security desk.</li>
  <li className="subText-color">For External Visitor - Please ensure you enter correct details of QuEST employee person you intend meet.</li>
  <li className="subText-color">Post your visit ensure you return the temporary ID card at security desk.</li>
  <li className="subText-color">Please click on <Link to={"/add-visitor/"}><button className="btn btn-primary" 
  >Register</button></Link> Button to start your registration</li>
    
</ul>      
    </div>
    );
  }
}

export default AddDoc;
