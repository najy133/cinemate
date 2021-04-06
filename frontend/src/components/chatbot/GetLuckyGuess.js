import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

export default function GetLuckyGuess() {
  
  const [result, setResult] = useState([])
  
  const get = async () => {
    try {
      let res = await axios.get('http://localhost:8000/api/movie/lucky-guess/');
      let result = res.data; 
      setResult(result);
    } catch (e) {
      console.log(e)
    };
  }; 

  useEffect(() => {
    get()
  }, [])
 
  
  return (
    <div>Here's your lucky guess!:
    <ul>
      {result.map((ress) => (<li>{ress}</li>))}
    </ul>
  </div>
    
  );
} 