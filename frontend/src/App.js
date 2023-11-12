import './App.css';
import Navbar from './components/Navbar/Navbar';
import TextSummarizer from './components/Text-Summarizer/TextSummarizer';
import React from 'react';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <TextSummarizer/>
    </div>
  );
}

export default App;
