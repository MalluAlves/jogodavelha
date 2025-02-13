import React, { useState, useEffect } from 'react';

const JogoDaVelhaMultiplayer = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState(null);
  const [isMultiplayer, setIsMultiplayer] = useState(false);

  useEffect(() => {
    if (isMultiplayer && !xIsNext) {
      const aiMove = board.findIndex(cell => cell === null);
      if (aiMove !== -1) handleClick(aiMove);
    }
  }, [xIsNext, isMultiplayer, board]);

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setScore(prev => ({ ...prev, [gameWinner]: prev[gameWinner] + 1 }));
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setXIsNext(true);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Jogo da Velha Multiplayer</h1>
      <button onClick={() => setIsMultiplayer(!isMultiplayer)}>
        {isMultiplayer ? 'Modo PvP' : 'Modo Multiplayer'}
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: '10px', justifyContent: 'center', margin: '20px auto' }}>
        {board.map((value, index) => (
          <div key={index} style={{
            width: '80px',
            height: '80px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '2em',
            background: '#fff',
            border: '2px solid #ccc',
            cursor: 'pointer'
          }} onClick={() => handleClick(index)}>
            {value}
          </div>
        ))}
      </div>
      {winner && <p>Vencedor: {winner}</p>}
      <button onClick={resetGame}>Reiniciar Jogo</button>
      <div style={{ marginTop: '20px' }}>
        <h2>Placar</h2>
        <p>X: {score.X} | O: {score.O}</p>
      </div>
    </div>
  );
};

export default JogoDaVelhaMultiplayer;
