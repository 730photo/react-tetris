import { useState } from 'react';

import { randomTetromino } from '../tetrominos';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
        // position for the player
        pos: { x: 0, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false,
  });

  return [player];
}