import { Button, Modal, Tooltip, Popover, OverlayTrigger } from "react-bootstrap";
import React, { Component } from "react";
// import { Grid, Input, Select } from "react-spreadsheet-grid";
// import UserSpreadsheet from "./components/AddWordsTable";
// import FlipCard from "react-flipcard";
import "./App.css";
import CardViewer from "./components/CardViewer";
var databaseURL = "https://sleepy-sea-27116.herokuapp.com/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: [], userCards: [], scores: [], current: {}, show: false, isHidden: true, synonyms: {} };
    this.getFlashcardData = this.getFlashcardData.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  getFlashcardData() {
    return fetch(databaseURL)
      .then(response => response.json())
      .then(response => {
        this.setState({
          cards: response.highschool_flashcards
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getFlashcardData().then(this.randomizer);
  }

  randomizer = () => {
    const card = this.state.cards[parseInt(Math.random() * this.state.cards.length)];
    this.setState({ current: card });
  };

  addScore = (word, score) => {
    this.state.scores[word] = score;
    this.setState({ scores: this.state.scores });
    this.submittedWords();
  };

  submittedWords = () => {
    return Object.keys(this.state.scores);
  };

  postToUserCards = (event) => {
    event.preventDefault();
    console.log(this.state)
    fetch(databaseURL + "teachers_flashcards", {
      method: "POST",
      body: JSON.stringify({
        id: this.state.current.id,
        definition: this.state.current.definition,
        partOfSpeech: this.state.current.partOfSpeech,
        synonyms: this.state.current.synonyms,
        word: this.state.current.word,
        level: event.target.value
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    .then(response => response.json())
    .then(this.setState({
      isHidden: !this.state.isHidden})) 
    .catch(error => console.error);
  }


  render() {
    const popover = (
      <Popover id="modal-popover">
        {this.state.current.synonyms ? `Synonym: ${this.state.current.synonyms.split(/\s?,\s?/)[0]}` : "No synonym"}
      </Popover>
    );
    const tooltip3 = <Tooltip id="tooltip">Rate yourself 3 if you know the definition by heart.</Tooltip>;
    const tooltip2 = <Tooltip id="tooltip">Rate yourself 2 if you are familiar with the word but don't really know the definition.</Tooltip>;
    const tooltip1 = <Tooltip id="tooltip">Rate yourself 1 if you do not know the definition.</Tooltip>;
    const Child = () => <div className="definition">
        {this.state.current.definition ? <div>{`Definition: ${this.state.current.definition}`}</div> : "No Word"}
        <div>{`Synonyms: ${this.state.current.synonyms}`}</div>
        <div>{`Part of Speech: ${this.state.current.partOfSpeech}`}</div>
        Rate Yourself:
        <OverlayTrigger placement="top" overlay={tooltip1}>
          <Button id="button1" value="-1" bsStyle="primary" onClick={event => {
              this.addScore(this.state.current.word, -1);
              this.randomizer();
              this.postToUserCards(event);
            }}>
            {" "}
            1
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={tooltip2}>
          <Button id="button2" value="2" bsStyle="primary" onClick={event => {
              this.addScore(this.state.current.word, 2);
              this.randomizer();
              this.postToUserCards(event);
            }}>
            {" "}
            2
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={tooltip3}>
          <Button id="button3" value="3" bsStyle="primary" onClick={event => {
              console.log(event.target.value);
              this.addScore(this.state.current.word, 3);
              this.randomizer();
              this.postToUserCards(event);
            }}>
            {" "}
            3
          </Button>
        </OverlayTrigger>
      </div>;
    return (
      <div className="App">
        <h1 className="App-title">Brainiac Cards</h1>
        {/* <UserSpreadsheet /> */}
        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          100 Words Every High School Graduate Should Know
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            <CardViewer card={this.state.current} />
            <hr />
            <h4>
              Want to see a hint? There is a{" "}
              <OverlayTrigger overlay={popover}>
                <a href="#popover" className="">
                  synonym
                </a>
              </OverlayTrigger>{" "}
              here
            </h4>
            <Button bsStyle="primary" onClick={this.randomizer}>
              Try Another Card
            </Button>
            <div>
              <Button bsStyle="primary" onClick={this.toggleHidden.bind(this)}>
                Reveal Definition
              </Button>{" "}
              {!this.state.isHidden && <Child />}
            </div>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      </div>
    );
  }
}

export default App;
