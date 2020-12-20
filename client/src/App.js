import React from "react";
import './App.css';
import './web-components';
import NavBar from './components/nav';
import HomePage from './components/home';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <NavBar />
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
        </div>
      </Router>
    </>
  );
};

export default App;