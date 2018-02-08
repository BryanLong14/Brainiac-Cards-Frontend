// Import required React Bootstrap components within src/App.js file or your  component files:
import { Navbar, Jumbotron, Button, ButtonGroup, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import React, { Component } from "react";
// import FlipCard from "react-flipcard";
import "./App.css";
import CardViewer from "./components/CardViewer";
// import addWordsTable from "./components/addWordsTable";
var databaseURL = "https://sleepy-sea-27116.herokuapp.com";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      userCards: [],
      scores: [],
      current: {}
    };
    this.getFlashcardData = this.getFlashcardData.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = { show: false, isHidden: true };
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
          // userCards: response.teachers_flashcards
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
  };


  render() {
    console.log(this.state.current);
    const popover = (
      <Popover id="modal-popover">{this.state.current ? `Synonym: ${this.state.current.synonyms.split(/\s?,\s?/)[0]}` : "No synonym"}</Popover>
    );

  const Child = () => <div className="definition">
      <div>{`Part of Speech: ${this.state.current.partOfSpeech}`}</div>
      <div>{`Synonyms: ${this.state.current.synonyms}`}</div>
      <div>{`Definition: ${this.state.current.definition}`}</div>
      Rate Yourself:
      <Button bsStyle="primary" onClick={() => this.addScore(this.state.current.word, 1)}>1</Button>
      <Button bsStyle="primary" onClick={() => this.addScore(this.state.current.word, 2)}>2</Button>
      <Button bsStyle="primary" onClick={() => this.addScore(this.state.current.word, 3)}>3</Button>
           
    </div>;

    return <div className="App">
        <Jumbotron>
          <h1 className="App-title">Brainiac Cards</h1>
        </Jumbotron>
        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          100 Words Every High School Graduate Should Know
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            <CardViewer card={this.state.current} />
            <hr />
            <h4>
              Want to see a hint? There is a <OverlayTrigger overlay={popover}>
                <a href="#popover" className="">
                  synonym
                </a>
              </OverlayTrigger> here
            </h4>
            <Button bsStyle="primary" onClick={this.randomizer}>
              Try Another Card
            </Button>
            <div>
              <Button bsStyle="primary" onClick={this.toggleHidden.bind(this)}>
                Reveal Definition
              </Button> {!this.state.isHidden && <Child />}
            </div>
            
            <Button onClick={this.handleClose}>Close</Button>
           
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      </div>;
  }
}


export default App;

