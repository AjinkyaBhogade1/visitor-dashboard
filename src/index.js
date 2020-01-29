import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route ,Switch  } from 'react-router-dom';

// import App from './App';
import AddDocument from './components/AddDocument';
import ListDocument from './components/ListDocument';
import EditDocument from './components/EditDocument';
import AddDoc from './components/AddDoc';



ReactDOM.render(
  
  <Router>
      <Switch>      
        <Route exact path='/' component={AddDoc} />
        <Route path='/add-visitor' component={AddDocument} />
        <Route path='/success' component={ListDocument} />
        <Route path='/edit-document/:id' component={EditDocument} />  
      </Switch>
  </Router>,
  document.getElementById('root')
);




