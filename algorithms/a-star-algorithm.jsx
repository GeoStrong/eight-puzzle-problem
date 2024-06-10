import { areStatesEqual, getPossibleMoves } from '../utils/utility-functions';

const manhattanDistance = (state, goalState) => {
  let distance = 0;
  const size = 3;
  for (let i = 0; i < state.length; i++) {
    if (state[i] !== 0) {
      const goalIndex = goalState.indexOf(state[i]);
      const currentRow = Math.floor(i / size);
      const currentCol = i % size;
      const goalRow = Math.floor(goalIndex / size);
      const goalCol = goalIndex % size;
      distance +=
        Math.abs(currentRow - goalRow) + Math.abs(currentCol - goalCol);
    }
  }
  return distance;
};

export const aStar = (initialState, goalState) => {
  const openSet = [initialState];
  const cameFrom = new Map();
  const gScore = new Map();
  const fScore = new Map();

  gScore.set(initialState.join(), 0);
  fScore.set(initialState.join(), manhattanDistance(initialState, goalState));

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScore.get(a.join()) - fScore.get(b.join()));
    const current = openSet.shift();

    if (areStatesEqual(current, goalState)) {
      const path = [];
      let temp = current;
      while (temp) {
        path.unshift(temp);
        temp = cameFrom.get(temp.join());
      }
      return path;
    }

    for (const neighbor of getPossibleMoves(current)) {
      const tentativeGScore = gScore.get(current.join()) + 1;

      if (
        !gScore.has(neighbor.join()) ||
        tentativeGScore < gScore.get(neighbor.join())
      ) {
        cameFrom.set(neighbor.join(), current);
        gScore.set(neighbor.join(), tentativeGScore);
        fScore.set(
          neighbor.join(),
          tentativeGScore + manhattanDistance(neighbor, goalState)
        );
        if (!openSet.some((state) => areStatesEqual(state, neighbor))) {
          openSet.push(neighbor);
        }
      }
    }
  }

  return null; // No solution found
};
