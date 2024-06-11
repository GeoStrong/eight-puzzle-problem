import { useState } from 'react';
import { bfs } from './bfs-algorithm';
import { aStar } from './a-star-algorithm';

const useLogic = (algorithm) => {
  const [initialState, setInitialState] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  const [inputValues, setInputValues] = useState(initialState.join(','));
  const [solution, setSolution] = useState([]);
  const goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];

  // Function to check if a given 8-puzzle configuration is solvable
  const isSolvable = (state) => {
    let inversions = 0; // Initialize inversion count
    const flatState = state.filter((tile) => tile !== 0); // Create a flat array excluding the empty space (0)

    // Count inversions
    for (let i = 0; i < flatState.length; i++) {
      for (let j = i + 1; j < flatState.length; j++) {
        if (flatState[i] > flatState[j]) inversions++; // Increment inversion count if a larger number precedes a smaller one
      }
    }

    // Return true if the number of inversions is even, indicating the puzzle is solvable
    return inversions % 2 === 0;
  };

  // Function to handle changes in the input field
  const handleChange = (e) => {
    setInputValues(e.target.value); // Update the input values state with the new input
  };

  // Function to handle the solving of the puzzle
  const handleSolve = () => {
    // Split the input string by commas, convert to numbers, and store in an array
    const initialArray = inputValues.split(',').map(Number);

    // Validate the input: check if it contains exactly 9 numbers from 0 to 8
    if (
      initialArray.length !== 9 ||
      new Set(initialArray).size !== 9 ||
      initialArray.includes(NaN)
    ) {
      alert('Please enter a valid configuration with numbers 0-8.');
      return; // Exit the function if the input is invalid
    }

    // Check if the puzzle configuration is solvable
    if (!isSolvable(initialArray)) {
      alert('The puzzle configuration is not solvable.');
      return; // Exit the function if the puzzle is not solvable
    }

    // Set the initial state to the validated and solvable configuration
    setInitialState(initialArray);

    // Solve the puzzle using the selected algorithm (BFS or A*)
    const result =
      algorithm === 'bfs'
        ? bfs(initialArray, goalState) // Use BFS if the selected algorithm is 'bfs'
        : aStar(initialArray, goalState); // Use A* if the selected algorithm is not 'bfs'

    // If a solution is found, update the solution state; otherwise, alert the user
    if (result) {
      setSolution(result); // Set the solution state with the result path
    } else {
      alert('No solution found'); // Alert the user if no solution is found
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
