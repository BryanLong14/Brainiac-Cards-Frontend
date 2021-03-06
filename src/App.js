import { Button, Modal, Tooltip, Popover, Carousel, OverlayTrigger, ListGroup, ListGroupItem } from "react-bootstrap";
import React, { Component } from "react";
import { createStore, combineReducers } from "redux";
import "./App.css";
import blankCard from "./assets/blankCard.jpg";
import CardViewer from "./components/CardViewer";
import NameForm from "./components/EnterWordsForm";
import TableUploadComponent from "./components/UploadSheetData";
var databaseURL = "https://sleepy-sea-27116.herokuapp.com/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      userCards: [],
      current: {},
      myFlashCards: [],
      showMyFlashcards: false,
      showMyPracticeFlashcards: false,
      show100cards: false,
      definitionIsHidden: true,
      addWordsToFlashCardsForm: false,
      megaUpload: false,
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
  };

  MyPracticeFlashcards = () => {
    this.setState({ showMyPracticeFlashcards: true });
  };

  closeMyFlashcards = () => {
    this.setState({ showMyFlashcards: false });
  };

  closeMyPracticeFlashcards = () => {
    this.setState({ showMyPracticeFlashcards: false });
  };

  getUserData = () => {
    return fetch(databaseURL + "user")
      .then(response => response.json())
      .then(response => {
        this.setState({ user: response.user });
      });
  };

  showUserEnterName = () => {
    this.setState({ showUserNames: true });
    this.getUserData();
  };

  closeUserEnterName = () => {
    this.setState({ showUserNames: false });
  };

  addWordsToFlashCards = () => {
    this.initData().then(() => {
      this.setState({ addWordsToFlashCardsForm: true });
    });
  };

  HideFlashCardsForm = () => {
    this.initData().then(() => {
      this.setState({ addWordsToFlashCardsForm: false });
    });
  };

  showMegaUpload = () => {
    this.setState({ megaUpload: true });
  };

  hideMegaUpload = () => {
    this.setState({ megaUpload: false });
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

  deleteCard = id => {
    return fetch(databaseURL + "teachers_flashcards/" + id, { method: "DELETE" })
      .then(response => response.text())
      .then(response => {})
      .then(this.initData)
      .catch(error => console.error);
  };

  componentDidMount = () => {
    this.initData();
  };

  initData = () => {
    return this.getFlashcardData()
      .then(this.randomizer)
      .then(this.getMyFlashcardData);
  };

  randomizer = () => {
    const card = this.state.cards[parseInt(Math.random() * this.state.cards.length)];
    this.setState({ current: card });
  };

  postToUserCards = event => {
    event.preventDefault();
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
      .then(() => this.setState({ definitionIsHidden: !this.state.definitionIsHidden }))
      .then(this.getMyFlashcardData);
  };

  render() {
    const popover = (
      <Popover id="modal-popover">
        {this.state.current.synonyms ? `Synonym: ${this.state.current.synonyms.split(/\s?,\s?/)[0]}` : "No synonym"}
      </Popover>
    );
    const tooltip3 = <Tooltip id="tooltip">Rate yourself 3 if this word appears to be in a foreign language.</Tooltip>;
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
            {"1"}
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={tooltip2}>
          <Button
            id="button2"
            value="2"
            bsStyle="primary"
            onClick={event => {
              this.randomizer();
              this.postToUserCards(event);
            }}
          >
            {"2"}
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={tooltip3}>
          <Button
            id="button3"
            value="3"
            bsStyle="primary"
            onClick={event => {
              this.randomizer();
              this.postToUserCards(event);
            }}
          >
            {"3"}
          </Button>
        </OverlayTrigger>
      </div>
    );
    return (
      <div className="App">
        <h1 className="App-title">Brainiac Cards</h1>

        <Button bsStyle="primary" bsSize="large" onClick={this.show100Flashcards}>
          100 Words Every High School Graduate Should Know
        </Button>
        <Button bsStyle="primary" bsSize="large" onClick={this.MyFlashcards}>
          My Flashcards
        </Button>

        {/* Modal for My Flashcards (View, Upload, Delete) */}
        <Modal bsSize="large" show={this.state.showMyFlashcards} onHide={this.closeMyFlashcards}>
          <Modal.Body>
            <h1 className="Vocab-Word">Ranked Flashcards</h1>

            <Button onClick={this.addWordsToFlashCards} bsSize="large" bsStyle="primary">
              Add Flashcards
            </Button>

            <Button onClick={this.showMegaUpload} bsStyle="primary" bsSize="large">
              Mega Upload
            </Button>

            <Button onClick={this.MyPracticeFlashcards} bsSize="large" bsStyle="primary">
              Practice My Flashcards
            </Button>

            <ListGroup>
              {this.state.myFlashCards
                .sort(function(a, b) {
                  return b.level - a.level;
                })
                .map((item, i) => {
                  return (
                    <ListGroupItem key={this.state.myFlashCards[i].id}>
                      <h3>Word: {this.state.myFlashCards[i].word}</h3>
                      <h4>
                        User Rated Difficulty:{" "}
                        {this.state.myFlashCards[i].level === "3" ? "Hard" : this.state.myFlashCards[i].level === "2" ? "Medium" : "Easy"}
                      </h4>
                      <Button bsStyle="danger" onClick={this.deleteCard.bind(this, this.state.myFlashCards[i].id)}>
                        Delete Card
                      </Button>
                    </ListGroupItem>
                  );
                })}
            </ListGroup>
            <Button onClick={this.closeMyFlashcards}>Close My Flashcards</Button>
          </Modal.Body>
        </Modal>

        {/* Modal for Practicing My Flashcards (View, Upload, Delete) */}
        <Modal bsSize="large" show={this.state.showMyPracticeFlashcards} onHide={this.closeMyPracticeFlashcards}>
          <Modal.Body>
            <h1 className="Vocab-Word">My Flashcards</h1>
            <Carousel interval={2500}>
              {this.state.myFlashCards.map((item, i) => {
                return (
                  <Carousel.Item key={this.state.myFlashCards[i].id}>
                    <img alt="900x500" src={blankCard} />
                    <Carousel.Caption>
                      <h1>Word: {this.state.myFlashCards[i].word}</h1>
                      <h3>Definition: {this.state.myFlashCards[i].definition}</h3>
                      <h3>{this.state.myFlashCards[i].synonyms ? `Synonym: ${this.state.myFlashCards[i].synonyms}` : "No synonym"}</h3>
                      <h3>{this.state.myFlashCards[i].partOfSpeech ? `Part of Speech: ${this.state.myFlashCards[i].partOfSpeech}` : "Not Listed"}</h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
            <Button onClick={this.closeMyPracticeFlashcards}>Close My Flashcards</Button>
          </Modal.Body>
        </Modal>

        {/* Modal for Form Popup to Add Individual Words*/}
        <Modal show={this.state.addWordsToFlashCardsForm} onHide={this.HideFlashCardsForm}>
          <NameForm />
        </Modal>

        {/* Modal for 100 Words Every Highschool Should Know */}
        <Modal show={this.state.show100cards} onHide={this.close100Flashcards}>
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
            <div>
              <Button bsStyle="primary" onClick={this.toggleDefinition.bind(this)}>
                Reveal Definition
              </Button>{" "}
              {!this.state.definitionIsHidden && <Definition />}
            </div>
            <Button onClick={this.close100Flashcards}>Close</Button>
          </Modal.Body>
        </Modal>

        {/* Modal showing large form upload */}
        <Modal bsSize="large" show={this.state.megaUpload}>
          <div className="ReactHandsoneTable">
            <h2>Add Flashcards</h2>
            <TableUploadComponent />
            <Button onClick={this.hideMegaUpload}>Close And Save Your Flashcards</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;
