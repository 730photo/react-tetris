import React, { useState } from 'react';

import { createStage } from '../gameHelpers';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  console.log('re-render');

// takes care of the left and the right movement
  const movePlayer = dir => {
    updatePlayerPos({ x: dir, y: 0 })
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    resetPlayer();
  }

  const drop = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false })
}
  
const dropPlayer = () => {
    drop();
}

// callback function when we press the keys on the keyboard
const move  = ({ keyCode }) => {
    if (!gameOver) {
        // moves player to the left
        if (keyCode === 37) {
            movePlayer(-1);
            // moves player to the right
        } else if (keyCode === 39) {
            movePlayer(1);
            // moves player down
        } else if (keyCode === 40) {
            dropPlayer();
        }
    }
}

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
      <StyledTetris>
            {/* Tetris stage */}
            <Stage stage ={stage} />
            <aside>
                {/* if the game is over */}
                {gameOver ? (
                    <Display gameOver={gameOver} text="Game Over" />
                ) : (
                <div>
                    {/* if the game is not over */}
                <Display text="Score"/>
                <Display text="Rows"/>
                <Display text="Level"/>
                </div>
                )}
                {/* resets the stage and resets the player */}
            <StartButton onClick={startGame} />
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;