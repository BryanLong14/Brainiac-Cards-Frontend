# Brainiac Cards
## Learn vocabulary through active recall and repetition
[Brainiac Cards Deployed App](https://braniac-cards.herokuapp.com/)
This web application allows users to study vocabulary in an interactive way. The database is populated with the famous 100 Words Every High School Graduate Should Know. Additionally, users:
See a word and think of the definition
Have the ability to see synonyms
See the definition of the word
Rate their knowledge of the definition on a 1-3 scale
Once words are rated they are saved to a database, which when viewed is sorted based on user’s selected word difficulty level.

Additional options: 
Upload your own words, definitions, and synonyms 
View saved cards in a carousel-style card viewer 
Delete user-uploaded flashcards


[Brainiac Demo](https://github.com/BryanLong14/frontend_flashcards_app/blob/master/src/assets/BraniacMovie%20(1).gif)


## Playing Modes:
1. Top 100 Words All High Schoolers Should Know
  Front side of the flashcard = Vocabulary Word. Swipe or click to go to the back of the card.
  Back side of the flashcard = definition, synonyms, and part of speech.
    Rate Yourself: Buttons:
        1: I have this word memorized, 
        2: I know this word, but don't have it memorized,
        3: I do not know the definition of this word


2. User Inputted Words


## Naming Conventions for Tower
Database Name: flashcards_app
Table 1 name: highschool_flashcards
	singular: highschool_flashcard
	seed: 01_highschool_flashcards

Table 2 name: teachers_flashcards
	singular: teachers_flashcard
	seed: 01_teachers_flashcard


## Galvanize Tower Readme
In this project, you'll build a full-stack application that has an API, reads and writes data, and uses a library. The topic is up to you!


## Requirements
* Has an API that can list, read, update, create, and delete data
* Has a database backing that API that has at least 2 different tables
* Has a front-end that uses a application framework (React) or component library that:
    * Consumes your API (list, read, update, create, and delete actions)
    * Uses some non-trivial (charting, mapping, payment, etc.) library (Handsontable)
    * Has at least 2 end-to-end tests

Add a link to your [deployed front-end URL](https://braniac-cards.herokuapp.com/), your [deployed API URL](https://sleepy-sea-27116.herokuapp.com/), and any [code repos you used] React Handsontab;le(https://github.com/handsontable/react-handsontable).
