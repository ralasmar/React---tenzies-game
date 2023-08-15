import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  //use effect watches to see if all dice are held and have the same value, if so it changes the state of tenzies to true
  React.useEffect(() => {
    //.every method will look for a specific condition, if every item is true for that condition it will return the value true
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSamevalue=dice.every(die => die.value === firstValue)
    
    if(allHeld && allSamevalue){
      setTenzies(true)
      console.log("You won!")
    }
  },[dice])

  function generateNewDie(){
    return {
      value: Math.ceil(Math.random()*6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    //new array to hold numbers
    const newDice = []
    //loop 10 times and push a random number to array from 1-6 to my array
    for(let i=0; i<10; i++){
      //push the values as objects instead of as numbers
      newDice.push(generateNewDie())
    }
    return newDice
  }

  //look through existing dice and not roll the ones where isHeld=true
  function rollDice(){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die:
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
    
  }

  //toggles the isHeld property with the provided id
  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} :
      die
    }))
  }

  //dice are displayed 
  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)} />)

    return (
        <main>
          {tenzies && <Confetti />}
           <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
            {diceElements}
          </div>
          <button 
              className="roll-dice" 
              onClick={rollDice}
            >
              {tenzies ? "New Game": "Roll"}
          </button>
        </main>
    )
}