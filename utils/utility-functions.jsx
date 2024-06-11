export const areStatesEqual = (state1, state2) =>
  state1.join() === state2.join();

export const getPossibleMoves = (state) => {
  const moves = [];
  const size = 3; // 3x3 puzzle
  const emptyIndex = state.indexOf(0); // Find the index of the empty space (0)
  const row = Math.floor(emptyIndex / size); // Calculate the row of the empty space
  const col = emptyIndex % size; // Calculate the column of the empty space

  // Generate possible moves by swapping the empty space with adjacent tiles
  if (row > 0) moves.push(swap(state, emptyIndex, emptyIndex - size)); // Move up
  if (row < size - 1) moves.push(swap(state, emptyIndex, emptyIndex + size)); // Move down
  if (col > 0) moves.push(swap(state, emptyIndex, emptyIndex - 1)); // Move left
  if (col < size - 1) moves.push(swap(state, emptyIndex, emptyIndex + 1)); // Move right

  return moves; // Return the list of possible moves
};

const swap = (state, i, j) => {
  const newState = [...state]; // Create a copy of the current state
  [newState[i], newState[j]] = [newState[j], newState[i]]; // Swap the tiles at indices i and j
  return newState; // Return the new state
};
