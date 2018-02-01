import React from "react";

function HighSchoolFlashcards(props) {
  console.log(props.data);
  return(
    <div className="singleFlashcard">
      <h2>100 Words Every High School Graduate Should Know</h2>
    </div>
  )
}


export default HighSchoolFlashcards;


// Shuffler Function Below
// import React from 'react';
// import { Link } from 'react-router';
//
// function shuffleArray(array) {
//   let i = array.length - 1;
//   for (; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     const temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
//   }
//   return array;
// }
//
// function RecommendedPosts({ posts }) {
//   const shuffledPosts = shuffleArray(posts);
//   return (
//     <ul>
//       {shuffledPosts.map((post, idx) => {
//         return (
//           <li key={idx}>
//             <p>{post.title}</p>
//             <p>{post.text}</p>
//             <p>{post.category}</p>
//             <Link to={`/blog/post-1/:${post.id}`}>Weiter lesen</Link>
//           </li>
//         );
//       })}
//     </ul>
//   );
// }
// RecommendedPosts.propTypes = {
//   posts: React.PropTypes.array,
// };
// export default RecommendedPosts;
