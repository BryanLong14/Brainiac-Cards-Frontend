// Import required React Bootstrap components within src/App.js file or your  component files:
import { Navbar, Jumbotron, Button, ButtonGroup, Modal, Popover, OverlayTrigger } from 'react-bootstrap';

import React, { Component } from "react"
import "./App.css"
import CardViewer from "./components/CardViewer"

var databaseURL = "https://sleepy-sea-27116.herokuapp.com"

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cards: [],
			userCards: [],
      scores: [],
      current: {}
		}
		this.getFlashcardData = this.getFlashcardData.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
          show: false
        };
      }

      handleClose() {
        this.setState({ show: false });
      }

      handleShow() {
        this.setState({ show: true });
      }

	getFlashcardData() {
    return fetch(databaseURL)
			.then(response => response.json())
			.then(response => {
				this.setState({
					cards: response.highschool_flashcards,
					// userCards: response.teachers_flashcards
				})
			})
			.catch(err => console.error(err))
	}

	componentDidMount() {
    this.getFlashcardData()
    .then (this.randomizer)
	}

  randomizer = () => {
    const card = this.state.cards[parseInt(Math.random() * this.state.cards.length)]
    this.setState({current:card})
  }

	render() {
    const popover = (
      <Popover id="modal-popover" title="Synonym for "
      // {this.state.current}
      // On line above: How to pull in the card name?
      >
        Shows Synonyms
      </Popover>
    )

		return (
			<div className="App">
      <Jumbotron><h1 className="App-title">Brainiac Cards</h1></Jumbotron>
        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          100 Words Every High School Graduate Should Know
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            <CardViewer card={this.state.current} />
            <hr/>
            <h4>Want to see a hint? There is a{' '}
              <OverlayTrigger overlay={popover}>
                <a href="#popover">synonym</a>
              </OverlayTrigger>{' '}
              here
            </h4>
            <Button bsStyle="primary" onClick={this.randomizer}>Next Card</Button>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
		)
	}
}






export default App
