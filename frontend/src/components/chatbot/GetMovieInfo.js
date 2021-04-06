import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

export default function GetMovieInfo() {
  
  const [result, setResult] = useState([])
  
  const get = async () => {
    try {
      let res = await axios.get('http://localhost:8000/api/movie/info/return-info/');
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
    <div>Movie Information:
    <ul>
      {result.map((ress) => (<li>{ress}</li>))}
    </ul>
  </div>
    
  );
} 