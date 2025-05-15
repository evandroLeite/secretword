//css
import './App.css';

//react
import { useCallback, useEffect, useState } from "react";

//data
import {wordsList} from "./data/words";

//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name : "start"},
  {id: 2, name : "game"},
  {id: 3, name : "end"},
];

const guessesQty = 3;

function App() {
const [gameStage, setGameStage] = useState(stages[0].name);
const [words] = useState(wordsList);

const [pickedWord, setPickedWord] = useState("");
const [pickedCategory, setPickedCategory] = useState("");
const [letters, setLetters] = useState([]);

const [guessedLetters , setGuessedLetters] = useState([]);
const [wrongLetters, setWorongLetters] = useState([]);
const [guesses, setGuesses] = useState(guessesQty);
const [score, setScore] = useState(0);

const pickedWordAndCategory = useCallback(() =>{
  // pick a random category
const categories = Object.keys(words);
const category = 
   categories[Math.floor(Math.random() * Object.keys(categories).length)]; 
  
  console.log(category);

  //pick a random word
  const word = words[category][Math.floor(Math.random() * words[category].length)];


  console.log(word);

  return {word, category};
},[words]);

  // start do jogo 
  const startGame = useCallback(() =>{
    //limpando as letras do jogo antigo
    clearLetterStates();

    // pick word e category
    const {word, category} = pickedWordAndCategory()
  
    //create array of letters
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase())

    console.log(wordLetters);
    console.log(word, category);

  // fill states
  setPickedWord(word);
  setPickedCategory(category);
  setLetters(wordLetters);
    
    setGameStage(stages[1].name);
  }, [pickedWordAndCategory]);

 //processo de verificação da letra
  const verifyLetter = (letter) => {
    const normalizeLetter = letter.toLowerCase()

    //checar se a letra ja foi utilizada
    if (
      (guessedLetters).includes(normalizeLetter) || 
      wrongLetters.includes(normalizeLetter)
    ) {
      return;
    }

    // coloquer a letra ou deduza uma chance
    if(letters.includes(normalizeLetter)) {
      setGuessedLetters((actualGuessedLetters)=> [
        ...actualGuessedLetters,
        normalizeLetter,
      ])
    } else {
      setWorongLetters((actualWrongLetters)=> [
        ...actualWrongLetters,
        normalizeLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses -1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWorongLetters([]);
  }

    //checando se as tentativas acabaram
    useEffect(() => {
      if(guesses <= 0) {
        // resetando o jogo
        clearLetterStates();

        setGameStage(stages[2].name);
      }
    },[guesses]);

//checando a condicao de vitoria
useEffect(() =>{

  const uniqueLetters = [...new Set(letters)];

  // condicao de vitoria
  if(guessedLetters.length === uniqueLetters.length){
    //add score
    setScore((actualScore) => actualScore += 100)



    //restart game com nova palavra
    startGame();

  }

},[guessedLetters, letters, startGame]);

// recomeçar o jogo
const retry = () => {
  setScore(0);
  setGuesses(guessesQty);
  setGameStage(stages[0].name);
};

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && (
        <Game 
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        />
        )}
      {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
