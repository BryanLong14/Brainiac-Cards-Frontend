import React from "react";
import { createStore, combineReducers } from "redux";
import ReactDOM from "react-dom";
import HotTable from "react-handsontable";

// const { createStore } = Redux;
// const { combineReducers } = Redux;

const changes = (state = [], action) => {
  switch (action.type) {
    case "change":
      return [
        ...state,
        {
          id: action.id,
          row: action.row,
          column: action.column,
          oldValue: action.oldValue,
          newValue: action.newValue,
          type: action.type
        }
      ];
    default:
      return state;
  }
};
const actionReducers = combineReducers({ changes });
const reduxStore = createStore(actionReducers);
// const newArray = this.props.actionList;
class ActionList extends React.Component {
  constructor(props) {
    super(props);
  }

  //   {
  //     for (let index = 0; index < newArray.length; index++) {
  //     const element = newArray[index];
  //     newArray.map(thing => {newArray[index].column})

  //   }
  // }

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
    let result = null;
    console.log("this props actions list", this.props.actionList);
    console.log("this state", this.state);
    console.log(
      this.props.actionList.map(function(action) {
        return (
        <li>word={action.word}</li>,
        <li>definition={action.definition}</li>,
        <li>synonym={action.synonym}</li> 
     )
    })
  )

    // result = this.props.actionList.map(function(action) {
    //   return <li key={action.id} className={action.type}>
    //       You have added <strong>{action.newValue}</strong>
    //     </li>;
    // });

    if (this.props.actionList.length === 0) {
      result = <div className="empty">Enter your vocabulary words in the spreadsheet above!</div>;
    } else {
      result = this.props.actionList.map(function(action) {
        return (
          <li key={action.id} className={action.type}>
            You have added <strong>{action.newValue}</strong>
          </li>
        );
      });
    }
    return (
      <div id="action-list">
        <h4>Change log:</h4>
        <ul>{result}</ul>
      </div>
    );
  }
}

export default class TableUploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handsontableData = [
      ["Word", "Definition", "Part of Speech", "Synonyms"],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""],
      [""]
    ];
  }

  render() {
    return <div id="example-component">
        <HotTable root="hot" settings={{ data: this.handsontableData, colHeaders: true, rowHeaders: true, onAfterChange: (changes, source) => {
              if (source !== "loadData") {
                reduxStore.dispatch({
                  id: reduxStore.getState().changes.length,
                  type: "change",
                  row: changes[0][0],
                  column: changes[0][1],
                  oldValue: changes[0][2],
                  newValue: changes[0][3]
                });
              }
            } }} />
        <ActionList actionList={reduxStore.getState().changes} />
      </div>;
  }
}

// const render = () => {
//   ReactDOM.render(<TableUploadComponent />, document.getElementById("root"));
// };
// reduxStore.subscribe(render);
// render();




// export default <TableUploadComponent />