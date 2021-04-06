import React, { Component } from 'react';
import axios from 'axios';


class Post extends Component {
  constructor(props) {
    super(props);
    const { steps } = this.props;
    const { recommendSubmit, recommendInput } = steps;

    this.state =  { recommendSubmit, recommendInput}; 
  }


  componentDidMount() {
    const userObject = {
      submit:this.state.recommendSubmit.value,
      input_movie:this.state.recommendInput.value,
    };
     axios.post('http://localhost:8000/api/movie/', {'title':userObject.input_movie})
    .then(res => {
      console.log(res.status)
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>Recommendation in progress...</div>
      );
    }
  };


  export default Post;