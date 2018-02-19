import {
  Button,
  Modal,
  Tooltip,
  Carousel,
  Popover,
  FormGroup, 
  OverlayTrigger,
  InputGroup,
  FormControl,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import React, { Component } from "react";
// import { Grid, Input, Select } from "react-spreadsheet-grid";
// import UserSpreadsheet from "./components/AddWordsTable";
// import FlipCard from "react-flipcard";
import "./App.css";
import blankCard from "./assets/blankCard.jpg";
import blankFlashCard from "./assets/blankFlashcard.png";
import CardViewer from "./components/CardViewer";
var databaseURL = "https://sleepy-sea-27116.herokuapp.com/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      userCards: [],
      // scores: [],
      current: {},
      myFlashCards: [],
      showMyFlashcards: false,
      show100cards: false,
      definitionIsHidden: true,
      synonyms: {},
      user: [],
      showUserNames: true
    };
  }

  close100Flashcards = () => {
    this.setState({ show100cards: false });
  };

  show100Flashcards = () => {
    this.setState({ show100cards: true });
  };

  toggleDefinition = () => {
    this.setState({
      definitionIsHidden: !this.state.definitionIsHidden
    });
  };

  MyFlashcards = () => {
    this.setState({ showMyFlashcards: true });
    // add function for showing user flashcards here
  };

  closeMyFlashcards = () => {
    this.setState({ showMyFlashcards: false });
  };

  getUserData = () => {
    return fetch(databaseURL + "user")
      .then(response => response.json())
      .then(response => {
        this.setState({ user: response.user });
      });
  };

  showUserEnterName = () => {
    console.log(this);
    this.setState({ showUserNames: true });
    this.getUserData ();
  };

  closeUserEnterName = () => {
    this.setState({ showUserNames: false });
  };

  getMyFlashcardData = () => {
    return fetch(databaseURL + "teachers_flashcards")
      .then(response => response.json())
      .then(response => {
        this.setState({ myFlashCards: response.teachers_flashcards });
      });
  };

  getFlashcardData = () => {
    return fetch(databaseURL)
      .then(response => response.json())
      .then(response => {
        this.setState({
          cards: response.highschool_flashcards
        });
      })
      .catch(err => console.error(err));
  };

  deteleCard = id => {
    console.log(this.state);
    return fetch(databaseURL + "teachers_flashcards/" + id, { method: "DELETE" })
      .then(response => response.json())
      .then(response => {
        this.setState({
          cards: response.highschool_flashcards
        });
        console.log(this.state);
      })
      .catch(error => console.error);
  };

  componentDidMount = () => {
    this.getFlashcardData()
      .then(this.randomizer)
      .then(this.getMyFlashcardData());
  };

  randomizer = () => {
    const card = this.state.cards[parseInt(Math.random() * this.state.cards.length)];
    this.setState({ current: card });
  };

  // addScore = (word, score) => {
  //   this.state.scores[word] = score;
  //   this.setState({ scores: this.state.scores });
  //   this.submittedWords();
  // };

  // submittedWords = () => {
  //   return Object.keys(this.state.scores);
  // };

  postToUserCards = event => {
    event.preventDefault();
    console.log(this.state);
    fetch(databaseURL + "teachers_flashcards/", {
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
      .catch(error => console.error)
      .then(this.setState({ definitionIsHidden: !this.state.definitionIsHidden }))
  };

  createSelectItems() {
    let items = [];
    for (let i = 0; i <= this.props.maxValue; i++) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
      //here I will be creating my options dynamically based on
      //what props are currently passed to the parent component
    }
    return items;
  }

  onDropdownSelected(e) {
    console.log("THE VAL", e.target.value);
    //here you will see the current selected value of the select input
  }

  render() {
    const popover = (
      <Popover id="modal-popover">
        {this.state.current.synonyms ? `Synonym: ${this.state.current.synonyms.split(/\s?,\s?/)[0]}` : "No synonym"}
      </Popover>
    );
    const tooltip3 = <Tooltip id="tooltip">Rate yourself 3 if think this word is in a foreign language.</Tooltip>;
    const tooltip2 = <Tooltip id="tooltip">Rate yourself 2 if you are familiar with the word but didn't know the definition.</Tooltip>;
    const tooltip1 = <Tooltip id="tooltip">Rate yourself 1 if you knew the definition.</Tooltip>;
    const Definition = () => (
      <div className="definition">
        {this.state.current.definition ? <div>{`Definition: ${this.state.current.definition}`}</div> : "No Word"}
        <div>{`Synonyms: ${this.state.current.synonyms}`}</div>
        <div>{`Part of Speech: ${this.state.current.partOfSpeech}`}</div>
        Rate Yourself:
        <OverlayTrigger placement="top" overlay={tooltip1}>
          <Button
            id="button1"
            value="-1"
            bsStyle="primary"
            onClick={event => {
              this.randomizer();
              this.setState({ definitionIsHidden: !this.state.definitionIsHidden });
            }}
          >
            {" "}
            1
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={tooltip2}>
          <Button
            id="button2"
            value="2"
            bsStyle="primary"
            onClick={event => {
              // this.addScore(this.state.current.word, 2);
              this.randomizer();
              this.postToUserCards(event);
            }}
          >
            {" "}
            2
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={tooltip3}>
          <Button
            id="button3"
            value="3"
            bsStyle="primary"
            onClick={event => {
              console.log(event.target.value);
              // this.addScore(this.state.current.word, 3);
              this.randomizer();
              this.postToUserCards(event);
            }}
          >
            {" "}
            3
          </Button>
        </OverlayTrigger>
      </div>
    );
    return <div className="App">
        <h1 className="App-title">Brainiac Cards</h1>

        <Modal show={this.state.showUserEnterName} onHide={this.closeUserEnterName}>
          <Modal.Body>
            <p>Testing ShowUserEnterName</p>
              <FormGroup show={this.state.showUserEnterName} onHide={this.closeUserEnterName}>
                <InputGroup>
                 <FormControl type="text" />
                   <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title="Add Name">
                   <MenuItem type="select" onChange={this.onDropdownSelected} label="Multiple Select" multiple>
                    {this.user ? <MenuItem eventKey="x">{this.user.username}</MenuItem> : <MenuItem eventKey="y">Some text</MenuItem>}{" "}
                  </MenuItem>{" "}
                </DropdownButton>
              </InputGroup>
            </FormGroup>
          </Modal.Body>
        </Modal>

        <div>
          {" "}
          <img height="300px" className="btn-card" alt="Blank Flashcard" onmouseover="" onClick={this.show100Flashcards} src={blankFlashCard} />
          {/* <h2>100 Words Every High School Graduate Should Know</h2> */}
        </div>

        <Button bsStyle="primary" bsSize="large" onClick={this.show100Flashcards}>
          100 Words Every High School Graduate Should Know
        </Button>
        <Button bsStyle="primary" bsSize="large" onClick={this.MyFlashcards}>
          My Flashcards
        </Button>
        {/* Modal for My Flashcards (View, Upload, Delete) */}
        <Modal bsSize="large" show={this.state.showMyFlashcards} onHide={this.closeMyFlashcards}>
          <Modal.Body>
            <h1 className="Vocab-Word">My Flashcards</h1>
            <Carousel interval={2500}>
              {this.state.myFlashCards.map((item, i) => {
                return <Carousel.Item key={this.state.myFlashCards[i].id}>
                    <img alt="900x500" src={blankCard} />
                    <Carousel.Caption>
                      <h1>Word: {this.state.myFlashCards[i].word}</h1>
                      <h3>Definition: {this.state.myFlashCards[i].definition}</h3>
                      <h3>{this.state.myFlashCards[i].synonyms ? `Synonym: ${this.state.myFlashCards[i].synonyms}` : "No synonym"}</h3>
                      <h3>
                        {this.state.myFlashCards[i].partOfSpeech ? `Part of Speeck: ${this.state.myFlashCards[i].partOfSpeech}` : "Not Listed"}
                      </h3>
                      <Button bsStyle="primary" onClick={
                        // event => {
                        //  this.getMyFlashcardData(); 
                         this.deteleCard.bind(this, this.state.myFlashCards[i].id)}
                        //  }
                         >
                        Delete Card
                      </Button>
                    </Carousel.Caption>
                  </Carousel.Item>;
              })}
            </Carousel>
            <Button onClick={this.closeMyFlashcards}>Close My Flashcards</Button>
          </Modal.Body>
        </Modal>

        {/* Modal for 100 Words Every Highschool Should Know */}
        <Modal show={this.state.show100cards} onHide={this.close100Flashcards}>
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
            <div>
              <Button bsStyle="primary" onClick={this.toggleDefinition.bind(this)}>
                Reveal Definition
              </Button> {!this.state.definitionIsHidden && <Definition />}
            </div>
            <Button onClick={this.close100Flashcards}>Close</Button>
          </Modal.Body>
        </Modal>
      </div>;
  }
}

export default App;
