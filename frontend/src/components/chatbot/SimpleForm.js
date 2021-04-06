import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import Post from './Post';
import Get from './Get';
import PostMovieInfo from './PostMovieInfo';
import GetMovieInfo from './GetMovieInfo';
import GetLuckyGuess from './GetLuckyGuess';
import { ThemeProvider } from 'styled-components';

const theme = {
  background: '#404040',
  fontFamily: 'sans-serif',
  headerBgColor: '#2F2F2F',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#787878',
  botFontColor: '#fff',
  userBubbleColor: '#A20000',
  userFontColor: '#fff',
};

const config = {
  width: "955px",
  height: "505px",
  hideUserAvatar: true,
  placeholder: 'Type your response.',
  headerTitle: "Cinemate",
  
  botDelay: 1,
  userDelay: 1,
  
};


class SimpleForm extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
       botAvatar = 'https://icon-library.com/images/free-movies-icon/free-movies-icon-16.jpg'
       style= {{height: '100vh', width: '100%'}}
        contentStyle = {{height: '83vh' }}
          steps={[
            {
              id: 'welcome',
              message: 'Hello, I am Cinemate! I recommend movies for you and your friends to enjoy.',
              trigger: 'servicesDescription',
            },
            {
              id: 'servicesDescription',
              message: 'What can I do for you?',
              trigger: 'services',
            },
            {
              id: 'services',
              options: [
                { value: '1', label: 'Movie Recommendation', trigger: 'recommendMessage'},
                { value: '2', label: 'Movie Information', trigger: 'informationMessage' },
                { value: '3', label: 'Lucky Guess', trigger: 'luckyGuessMessage'},
              ]
            },
            {
              id: 'recommendMessage',
              message: "Please Enter a movie that you like, so that I can recommend something similar!" ,
              trigger: 'recommendInput',
            },
            {
              id: 'informationMessage',
              message: "Please Enter a movie that you would like to know about!" ,
              trigger: 'informationInput',
            },
            {
              id: 'recommendInput',
              user: true,
              trigger: 'recommendSubmit',
            },
            {
              id: 'informationInput',
              user: true,
              trigger: 'informationSubmit',
            },
            {
              id: 'recommendSubmit',
              message: 'Would you like a movie suggestion that\'s similar to {previousValue}?',
              trigger: 'submit1'
            },
            {
              id: 'informationSubmit',
              message: 'Would you like to know about {previousValue}?',
              trigger: 'submit2'
            },
            {
              id: 'submit1',
              options: [
                { value: 'y', label: 'Yes', trigger: 'end-message1' },
                { value: 'n', label: 'No', trigger: 'no-submit' },
              ]
            },
            {
              id: 'submit2',
              options: [
                { value: 'y', label: 'Yes', trigger: 'end-message2' },
                { value: 'n', label: 'No', trigger: 'no-submit' },
              ]
            },
            {
              id: 'no-submit',
              message: 'Sorry to hear that.',
              end: true,
            },
            {
              id: 'end-message1',
              component: <Post/>,
              asMessage: true,
              trigger: 'Bye1',
            },
            {
              id: 'Bye1',
              component: <Get/>,
              trigger: 'continue',
            },
            {
              id: 'end-message2',
              component: <PostMovieInfo/>,
              asMessage: true,
              trigger: 'Bye2',
            },
            {
              id: 'Bye2',
              component:<GetMovieInfo />,
              trigger: 'continue',
            },
            
            {
              id: 'luckyGuessMessage',
              message: "Suggesting movie from IMDB's top 250 movies...",
              trigger: 'Bye3',
            },
            {
              id: 'Bye3',
              component: <GetLuckyGuess />,
              trigger: 'continue',
            },
            {
              id: 'continue',
              message: 'Would you like to continue?',
              trigger: 'next',
            },
            {
              id: 'next',
              options: [
                { value: 'true', label: 'Yes', trigger: 'servicesDescription' },
                { value: 'false', label: 'No', trigger: 'end' },
              ]
            }
            ,{
              id:'end',
              message:'Bye, see you soon!',
              end:true
            }
            
          ]}
          {...config}
        />
      </ThemeProvider>
    );
  }
}
export default SimpleForm;