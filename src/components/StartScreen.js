import "./StartScreen.css";


const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1>Secret Word</h1>
        <p>Clique no botao abaixo para começar</p>
        <button onClick={startGame} className="buttonStart">Começar</button>
    </div>
  )
}

export default StartScreen