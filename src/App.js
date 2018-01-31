// Import required React Bootstrap components within src/App.js file or your  component files:
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';

import React, { Component } from 'react';
import './App.css';
import HighSchoolFlashcards from "./components/HighSchoolFlashcards";
import UserFlashCards from "./components/UserFlashCards";

var databaseURL = "https://sleepy-sea-27116.herokuapp.com";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HighSchoolFlashcards: [],
      UserFlashCards: []
    };
    this.HighSchoolFlashcardCreateSubmitHandler = this.HighSchoolFlashcardCreateSubmitHandler.bind(this);
    this.HighSchoolFlashcardUpdateSubmitHandler = this.HighSchoolFlashcardUpdateSubmitHandler.bind(this);
    this.HighSchoolFlashcardListSubmitHandler = this.HighSchoolFlashcardListSubmitHandler.bind(this);
    this.HighSchoolFlashcardDeleteSubmitHandler = this.HighSchoolFlashcardDeleteSubmitHandler.bind(this);
    this.listAllHighSchoolFlashcardsSubmitHandler = this.listAllHighSchoolFlashcardsSubmitHandler.bind(this);
    this.UserFlashCardCreateSubmitHandler = this.UserFlashCardCreateSubmitHandler.bind(this);
    this.UserFlashCardUpdateSubmitHandler = this.UserFlashCardUpdateSubmitHandler.bind(this);
    this.UserFlashCardListSubmitHandler = this.UserFlashCardListSubmitHandler.bind(this);
    this.UserFlashCardDeleteSubmitHandler = this.UserFlashCardDeleteSubmitHandler.bind(this);
    this.listAllUserFlashCardsSubmitHandler = this.listAllUserFlashCardsSubmitHandler.bind(this);
    // which of the above methods do we need to bind to this? Research...
  }

  getFlashcardData() {
    fetch(databaseURL)
      .then(response => response.json())
      .then(response => {
        this.setState({
          HighSchoolFlashcards: response.HighSchoolFlashcards,
          UserFlashCards: response.UserFlashCards
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getFlashcardData();
  }







  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Brainiac Cards</h1>
        </header>
        <HighSchoolFlashcards />
        <UserFlashCards />
      </div>
    );
  }
}

export default App;
