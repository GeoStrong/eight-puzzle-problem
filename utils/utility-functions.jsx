export const areStatesEqual = (state1, state2) =>
  state1.join() === state2.join();

export const getPossibleMoves = (state) => {
  const moves = [];
  const size = 3; // 3x3 puzzle
  const emptyIndex = state.indexOf(0);
  const row = Math.floor(emptyIndex / size);
  const col = emptyIndex % size;

  if (row > 0) moves.push(swap(state, emptyIndex, emptyIndex - size)); // Move up
  if (row < size - 1) moves.push(swap(state, emptyIndex, emptyIndex + size)); // Move down
  if (col > 0) moves.push(swap(state, emptyIndex, emptyIndex - 1)); // Move left
  if (col < size - 1) moves.push(swap(state, emptyIndex, emptyIndex + 1)); // Move right

  return moves;
};

const swap = (state, i, j) => {
  const newState = [...state];
  [newState[i], newState[j]] = [newState[j], newState[i]];
  return newState;
};
