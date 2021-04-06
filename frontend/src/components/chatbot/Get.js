import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

export default function Get() {
  
  const [result, setResult] = useState([])
  
  const get = async () => {
    try {
      let res = await axios.get('http://localhost:8000/api/movie/recommend/');
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
    <div>I recommend the following movies:
    <ul>
      {result.map((ress) => (<li>{ress}</li>))}
    </ul>
  </div>
    
  );
} 