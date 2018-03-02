import React from "react";
import { FormGroup, Button, Form, Radio, FormControl } from "react-bootstrap";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", wordValue: "", definitionValue: "", synonymsValue: "", showMyPracticeFlashcards: false };
    this.baseState = this.state;

    this.handlewordValueChange = this.handlewordValueChange.bind(this);
    this.handledefinitionValueChange = this.handledefinitionValueChange.bind(this);
    this.handlesynonymsValueChange = this.handlesynonymsValueChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.postToMyCards = this.postToMyCards.bind(this);
  }

  handlewordValueChange(event) {
    this.setState({ wordValue: event.target.value });
  }

  handledefinitionValueChange(event) {
    this.setState({ definitionValue: event.target.value });
  }

  handlesynonymsValueChange(event) {
    this.setState({ synonymsValue: event.target.value });
  }

  handleValueChange(event) {
    this.setState({ value: event.target.value });
  }

  closeMyPracticeFlashcards = () => {
    this.setState({ showMyPracticeFlashcards: false });
  };

  resetForm = () => {
    this.setState(this.baseState);
  };

  postToMyCards = event => {
    event.preventDefault();
    console.log(this);
    fetch("https://sleepy-sea-27116.herokuapp.com/teachers_flashcards/", {
      method: "POST",
      body: JSON.stringify({
        definition: this.state.definitionValue,
        synonyms: this.state.synonymsValue,
        word: this.state.wordValue,
        level: this.state.value
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .then(this.resetForm)
      .then()
      .catch(error => console.error);
  };

  render() {
    return (
      <Form onSubmit={this.postToMyCards} className="UploadForm">
        <FormGroup>
          <h2>Create a Flashcard to Add to Your Flashcard List</h2>
        </FormGroup>
        <FormGroup>
          <FormControl type="text" placeholder="Word" id="word" value={this.state.wordValue} onChange={this.handlewordValueChange} />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Definition"
            id="definition"
            value={this.state.definitionValue}
            onChange={this.handledefinitionValueChange}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="text"
            placeholder="Synonyms separated by commas"
            id="synonyms"
            value={this.state.synonymsValue}
            onChange={this.handlesynonymsValueChange}
          />
        </FormGroup>
        <FormGroup className="radioButtons" onChange={this.handleValueChange}>
          Select Difficulty Level
          <Radio className="radioA" name="radioGroup" value="1" />Easy
          <Radio className="radioB" name="radioGroup" value={"2"} />Medium
          <Radio className="radioB" name="radioGroup" value={"3"} />Hard
        </FormGroup>
        <p id="message" />
        <Button bsStyle="primary" type="submit">
          Add Flashcard
        </Button>
      </Form>
    );
  }
}

export default NameForm;
