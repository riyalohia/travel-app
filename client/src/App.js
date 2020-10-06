import React from "react";
import './App.css';
import './web-components';
import NavBar from './components/nav';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={NavBar} />
      </div>
    </Router>
  );
};

export default App;