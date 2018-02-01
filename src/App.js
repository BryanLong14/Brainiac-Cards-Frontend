// Import required React Bootstrap components within src/App.js file or your  component files:
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';

import React, {Component} from 'react';
import './App.css';
import HighSchoolFlashcards from "./components/HighSchoolFlashcards";
import UserFlashCards from "./components/UserFlashCards";

var databaseURL = "https://sleepy-sea-27116.herokuapp.com";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      HighSchoolFlashcards: {},
      UserFlashCards: {}
      }
      this.getFlashcardData=this.getFlashcardData.bind(this)
  }

  getFlashcardData() {
    fetch(databaseURL)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        console.log(response.highschool_flashcards)
        console.log(response.highschool_flashcards[8])
        console.log(response.highschool_flashcards[8].word)
        this.setState({
          HighSchoolFlashcards: response.highschool_flashcards,
          UserFlashCards: response.teachers_flashcards
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getFlashcardData();
  }



  render() {
    return ( <
      div className = "App" >
      <header className = "App-header" >
      <h1 className = "App-title" > Brainiac Cards < /h1> < /
      header >
      <HighSchoolFlashcards
      HighSchoolFlashcards={this.state.HighSchoolFlashcards}
      / >
      <UserFlashCards / >
      </div>
    );
  }
}

export default App;
