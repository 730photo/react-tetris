import { useState } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = () => {
    // generates the initial playing stage
    const [stage, setStage] = useState(createStage())

    return [stage, setStage];
}