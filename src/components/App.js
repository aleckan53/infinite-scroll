import React, { useState } from 'react';
import InfiniteList from './InfiniteList';

export default function App() {
  
  const [state, setState] = useState([]);

  return (
    <div className='App'>
      <InfiniteList state={state} setState={setState}/>
    </div>
  );
};