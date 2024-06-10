import { areStatesEqual, getPossibleMoves } from '../utils/utility-functions';

export const bfs = (initialState, goalState) => {
  const queue = [[initialState]];
  const visited = new Set();
  visited.add(initialState.join());

  while (queue.length > 0) {
    const path = queue.shift();
    const currentState = path[path.length - 1];

    if (areStatesEqual(currentState, goalState)) {
      return path;
    }

    for (const nextState of getPossibleMoves(currentState)) {
      const nextStateStr = nextState.join();
      if (!visited.has(nextStateStr)) {
        visited.add(nextStateStr);
        queue.push([...path, nextState]);
      }
    }
  }

  return null; // No solution found
};
