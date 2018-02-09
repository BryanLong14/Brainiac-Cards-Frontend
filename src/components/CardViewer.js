import React from "react";

function Card ({card}) {
  // console.log(Card);
  return(
    <div className="singleFlashcard">
      {/* <h2>100 Words Every High School Graduate Should Know</h2> */}
      <h3>Think of the definition of :</h3>
      <h3 className="Vocab-Word">{card.word}</h3>
    </div>
  )
}


export default Card;
