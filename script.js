const riddles = [
  { answer: "Zidane", players: ["Desailly", "Ronaldo", "Del Piero", "Davids"] },
  { answer: "Henry", players: ["S.Campbell", "Barthez", "Messi", "Luyindula"] },
  // ... ajoutez le reste des devinettes ici
];

function FootballRiddleChatbot() {
  const [currentRiddle, setCurrentRiddle] = React.useState(null);
  const [userGuess, setUserGuess] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [correctGuesses, setCorrectGuesses] = React.useState(0);

  const generateRiddle = () => {
    const riddle = riddles[Math.floor(Math.random() * riddles.length)];
    return {
      answer: riddle.answer,
      riddle: `I played with ${riddle.players.join('\nI played with ')}\nWho am I?`
    };
  };

  React.useEffect(() => {
    newRiddle();
  }, []);

  const newRiddle = () => {
    setCurrentRiddle(generateRiddle());
    setUserGuess('');
    setMessage('');
  };

  const handleGuess = () => {
    if (userGuess.toLowerCase() === currentRiddle.answer.toLowerCase()) {
      setMessage('Correct! Well done!');
      setCorrectGuesses(prev => prev + 1);
      setTimeout(newRiddle, 2000);
    } else {
      setMessage('Sorry, that\'s not the right answer. Try again!');
    }
  };

  return (
    <div>
      <h2>Football Riddles</h2>
      {currentRiddle && (
        <>
          <pre>{currentRiddle.riddle}</pre>
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Enter your guess"
            onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
          />
          <button onClick={handleGuess}>Guess</button>
          {message && <p>{message}</p>}
        </>
      )}
      <p>Score: {correctGuesses}</p>
      <button onClick={newRiddle}>New Riddle</button>
    </div>
  );
}

ReactDOM.render(<FootballRiddleChatbot />, document.getElementById('root'));
