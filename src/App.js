import React, { Component } from 'react';
import './App.css';

import  Students  from '../src/components/students/students';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Students />
      </div>
    );
  }
}

export default App;
