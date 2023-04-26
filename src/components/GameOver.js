import React from 'react';

const GameOver = (props) => {
  return (
    <div className='modal'>
      <div className='overlay'>
        <h1>Game Over</h1>
        <p>Score:{props.score}</p>
        <p><span>{props.message}</span></p>
        <button className='close' onClick={props.close}>X</button>
        <button className='play' onClick={(props.play)}>Play again</button>
      </div>
    </div>
  );
};

export default GameOver;