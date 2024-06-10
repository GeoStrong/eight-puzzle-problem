import { areStatesEqual, getPossibleMoves } from '../utils/utility-functions';

// Heuristic function (Manhattan distance)
const manhattanDistance = (state, goalState) => {
  let distance = 0; // Initialize the total distance to 0
  const size = 3; // Define the size of the puzzle (3x3)

  // Iterate through each tile in the current state
  for (let i = 0; i < state.length; i++) {
    // We only need to calculate distance for non-zero tiles
    if (state[i] !== 0) {
      // Find the position of the current tile in the goal state
      const goalIndex = goalState.indexOf(state[i]);

      // Calculate the row and column of the current tile in the current state
      const currentRow = Math.floor(i / size);
      const currentCol = i % size;

      // Calculate the row and column of the current tile in the goal state
      const goalRow = Math.floor(goalIndex / size);
      const goalCol = goalIndex % size;

      // Calculate the Manhattan distance for the current tile
      // Add it to the total distance
      distance +=
        Math.abs(currentRow - goalRow) + Math.abs(currentCol - goalCol);
    }
  }
  return distance; // Return the total Manhattan distance
};

// A* Algorithm
export const aStar = (initialState, goalState) => {
  const openSet = [initialState]; // Initialize the open set with the initial state
  const cameFrom = new Map(); // Map to store the best path to each node
  const gScore = new Map(); // Map to store the cost from start to each node
  const fScore = new Map(); // Map to store the estimated cost from start to goal through each node

  gScore.set(initialState.join(), 0); // gScore for the initial state is 0
  fScore.set(initialState.join(), manhattanDistance(initialState, goalState)); // fScore is the heuristic value

  while (openSet.length > 0) {
    // Sort the open set based on fScore
    openSet.sort((a, b) => fScore.get(a.join()) - fScore.get(b.join()));
    const current = openSet.shift(); // Get the node with the lowest fScore

    if (areStatesEqual(current, goalState)) {
      // If current state is the goal state, reconstruct the path
      const path = [];
      let temp = current;
      while (temp) {
        path.unshift(temp); // Add each state to the path
        temp = cameFrom.get(temp.join()); // Move to the parent state
      }
      return path; // Return the path from start to goal
    }

    for (const neighbor of getPossibleMoves(current)) {
      // For each neighbor of the current state
      const tentativeGScore = gScore.get(current.join()) + 1; // Tentative gScore is the gScore of the current state + cost to reach neighbor

      if (
        !gScore.has(neighbor.join()) ||
        tentativeGScore < gScore.get(neighbor.join())
      ) {
        // If this path is better, record it
        cameFrom.set(neighbor.join(), current); // Set the parent of neighbor to current
        gScore.set(neighbor.join(), tentativeGScore); // Update gScore
        fScore.set(
          neighbor.join(),
          tentativeGScore + manhattanDistance(neighbor, goalState)
        ); // Update fScore with heuristic

        if (!openSet.some((state) => areStatesEqual(state, neighbor))) {
          // If neighbor is not in open set, add it
          openSet.push(neighbor);
        }
      }
    }
  }

  return null; // No solution found
};
