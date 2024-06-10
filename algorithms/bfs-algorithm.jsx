import { areStatesEqual, getPossibleMoves } from '../utils/utility-functions';

// BFS Algorithm
export const bfs = (initialState, goalState) => {
  const queue = [[initialState]]; // Initialize the queue with the initial state in a path array
  const visited = new Set(); // Set to keep track of visited states
  visited.add(initialState.join()); // Mark the initial state as visited

  while (queue.length > 0) {
    const path = queue.shift(); // Dequeue the first path
    const currentState = path[path.length - 1]; // Get the last state in the path

    if (areStatesEqual(currentState, goalState)) {
      return path; // If the current state is the goal state, return the path
    }

    for (const nextState of getPossibleMoves(currentState)) {
      const nextStateStr = nextState.join(); // Convert the next state to a string
      if (!visited.has(nextStateStr)) {
        visited.add(nextStateStr); // Mark the next state as visited
        queue.push([...path, nextState]); // Enqueue the new path with the next state
      }
    }
  }

  return null; // No solution found
};
