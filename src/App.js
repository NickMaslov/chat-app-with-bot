import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import Nav from './Nav';
import Channel from './Channel'

function App() {
  return (
    <div className="App">
      <Nav />
      <Channel />
    </div>
  );
}

export default App;
