const WinScreen = ({ nextRound }) => {

    return (
    <div>
    <h2>🎉 Parabéns, você acertou!</h2>
    <button onClick={nextRound}>Continuar</button>
    </div>
);
};

export default WinScreen;