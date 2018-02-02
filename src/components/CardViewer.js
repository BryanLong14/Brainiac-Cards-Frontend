import React from "react";

function Card ({card}) {
  // console.log(Card);
  return(
    <div className="singleFlashcard">

      <h2>100 Words Every High School Graduate Should Know</h2>
      <hr/>
      <h3 className="Vocab-Word">{card.word}</h3>
    </div>
  )
}


export default Card;
