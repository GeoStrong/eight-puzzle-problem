import { useState } from 'react';
import { bfs } from './bfs-algorithm';
import { aStar } from './a-star-algorithm';

const useLogic = (algorithm) => {
  const [initialState, setInitialState] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  const [inputValues, setInputValues] = useState(initialState.join(','));
  const [solution, setSolution] = useState([]);
  const goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];

  const isSolvable = (state) => {
    let inversions = 0;
    const flatState = state.filter((tile) => tile !== 0);
    for (let i = 0; i < flatState.length; i++) {
      for (let j = i + 1; j < flatState.length; j++) {
        if (flatState[i] > flatState[j]) inversions++;
      }
    }
    return inversions % 2 === 0;
  };

  const handleChange = (e) => {
    setInputValues(e.target.value);
  };

  const handleSolve = () => {
    const initialArray = inputValues.split(',').map(Number);
    if (
      initialArray.length !== 9 ||
      new Set(initialArray).size !== 9 ||
      initialArray.includes(NaN)
    ) {
      alert('Please enter a valid configuration with numbers 0-8.');
      return;
    }
    if (!isSolvable(initialArray)) {
      alert('The puzzle configuration is not solvable.');
      return;
    }
    setInitialState(initialArray);
    const result =
      algorithm === 'bfs'
        ? bfs(initialArray, goalState)
        : aStar(initialArray, goalState);
    if (result) {
      setSolution(result);
    } else {
      alert('No solution found');
    }
  };

  return {
    initialState,
    inputValues,
    solution,
    handleChange,
    handleSolve,
  };
};
export default useLogic;
