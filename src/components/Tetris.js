import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  console.log('re-render');

// takes care of the left and the right movement
const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  }

  const drop = () => {
    // increase level once player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev +1);
      // Also increase speed
      setDropTime (1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
        updatePlayerPos({ x: 0, y: 1, collided: false });
      } else {
        // Game over!
        if (player.pos.y < 1) {
            console.log('GAME OVER!!!');
            setGameOver(true);
            setDropTime(null);
          }
          updatePlayerPos({ x: 0, y: 0, collided: true });
        }
      };

      const keyUp = ({ keyCode }) => {
        if (!gameOver) {
          if (keyCode === 40) 
          console.log("interval on")
          setDropTime(1000 / (level + 1) + 200);
        }
      }
    
      const dropPlayer = () => {
        console.log("interval off")
        // We don't need to run the interval when we use the arrow down to
        // move the tetromino downwards. So deactivate it for now.
        setDropTime(null);
        drop();
      };

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
        } else if (keyCode === 38) {
            playerRotate(stage, 1);
        }
    }
};

useInterval(() => {
  drop();
}, dropTime)

  return (
    <StyledTetrisWrapper 
    role="button" 
    tabIndex="0" 
    onKeyDown={e => move(e)} onKeyUp={keyUp}
    >
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
                <Display text={`Score: ${score}`} />
                <Display text={`Rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
                </div>
                )}
                {/* resets the stage and resets the player */}
            <StartButton callback={startGame} />
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;