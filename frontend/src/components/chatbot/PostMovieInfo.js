import React, { Component } from 'react';
import axios from 'axios';


class PostMovieInfo extends Component {
  constructor(props) {
    super(props);
    const { steps } = this.props;
    const { informationSubmit, informationInput } = steps;

    this.state =  { informationSubmit, informationInput}; 
  }
 

  componentDidMount() {
    const userObject = {
      submit:this.state.informationSubmit.value,
      input_movie:this.state.informationInput.value,
    };
     axios.post('http://localhost:8000/api/movie/info/', {'title':userObject.input_movie})
    .then(res => {
      console.log(res.status)
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>Fetching Movie Information...</div>
      );
    }
  };


  export default PostMovieInfo;