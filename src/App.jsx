import { useState } from 'react';
import useLogic from '../algorithms/logic';

// const areStatesEqual = (state1, state2) => state1.join() === state2.join();

// const getPossibleMoves = (state) => {
//   const moves = [];
//   const size = 3; // 3x3 puzzle
//   const emptyIndex = state.indexOf(0);
//   const row = Math.floor(emptyIndex / size);
//   const col = emptyIndex % size;

//   if (row > 0) moves.push(swap(state, emptyIndex, emptyIndex - size)); // Move up
//   if (row < size - 1) moves.push(swap(state, emptyIndex, emptyIndex + size)); // Move down
//   if (col > 0) moves.push(swap(state, emptyIndex, emptyIndex - 1)); // Move left
//   if (col < size - 1) moves.push(swap(state, emptyIndex, emptyIndex + 1)); // Move right

//   return moves;
// };

// const swap = (state, i, j) => {
//   const newState = [...state];
//   [newState[i], newState[j]] = [newState[j], newState[i]];
//   return newState;
// };

// BFS Algorithm
// const bfs = (initialState, goalState) => {
//   const queue = [[initialState]];
//   const visited = new Set();
//   visited.add(initialState.join());

//   while (queue.length > 0) {
//     const path = queue.shift();
//     const currentState = path[path.length - 1];

//     if (areStatesEqual(currentState, goalState)) {
//       return path;
//     }

//     for (const nextState of getPossibleMoves(currentState)) {
//       const nextStateStr = nextState.join();
//       if (!visited.has(nextStateStr)) {
//         visited.add(nextStateStr);
//         queue.push([...path, nextState]);
//       }
//     }
//   }

//   return null; // No solution found
// };

// const isSolvable = (state) => {
//   let inversions = 0;
//   const flatState = state.filter((tile) => tile !== 0);
//   for (let i = 0; i < flatState.length; i++) {
//     for (let j = i + 1; j < flatState.length; j++) {
//       if (flatState[i] > flatState[j]) inversions++;
//     }
//   }
//   return inversions % 2 === 0;
// };

// // const initialState = [1, 2, 0, 3, 4, 5, 6, 7, 8];
// const goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];

const App = () => {
  // const [initialState, setInitialState] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  // const [inputValues, setInputValues] = useState(initialState.join(','));
  // const [solution, setSolution] = useState([]);
  const [activeAlgorithm, setActiveAlgorithm] = useState('bfs');
  const { inputValues, solution, handleChange, handleSolve } =
    useLogic(activeAlgorithm);

  // const handleChange = (e) => {
  //   setInputValues(e.target.value);
  // };

  // const handleSolve = () => {
  //   const initialArray = inputValues.split(',').map(Number);
  //   if (
  //     initialArray.length !== 9 ||
  //     new Set(initialArray).size !== 9 ||
  //     initialArray.includes(NaN)
  //   ) {
  //     alert('Please enter a valid configuration with numbers 0-8.');
  //     return;
  //   }
  //   if (!isSolvable(initialArray)) {
  //     alert('The puzzle configuration is not solvable.');
  //     return;
  //   }
  //   setInitialState(initialArray);
  //   const result = bfs(initialArray, goalState);
  //   if (result) {
  //     setSolution(result);
  //   } else {
  //     alert('No solution found');
  //   }
  // };

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">
        8-იანის თამაშის ამოხსნა {activeAlgorithm.toUpperCase()} ალგორითმით
      </h1>
      <div className="flex mt-5 justify-center items-center gap-4">
        <p className="font-bold">აირჩიეთ ალგორითმი</p>
        <select
          name="algorithm selector"
          onChange={(event) => {
            setActiveAlgorithm(event.target.value);
          }}
          className="p-2 bg-gray-200 rounded-lg"
        >
          <option value="bfs" className="p-2">
            BFS
          </option>
          <option value="a*" className="p-2">
            A*
          </option>
        </select>
      </div>
      <div>
        <label className="flex justify-center flex-col items-center gap-4 mt-5">
          შეიყვანეთ ციფრების თავდაპირველი წყობა (დაშორება მძიმით, 0-ით აღნიშნეთ
          ცარიელი ადგილი):
          <input
            type="text"
            className="border-2 p-2 rounded-lg"
            value={inputValues}
            onChange={handleChange}
          />
        </label>
      </div>
      <button
        onClick={handleSolve}
        className="py-2 px-4 rounded-lg mt-5 bg-gray-200"
      >
        ამოხსნა
      </button>
      {solution.length > 0 && (
        <div>
          <h2>ამოხსნის გზები:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 gap-4 pt-2 pb-8">
            {solution.map((step, index) => (
              <div
                className="flex flex-col items-center border-2 rounded-lg p-2 py-4 justify-center gap-3"
                key={index}
              >
                <p className="font-bold">{index + 1}</p>
                <div className="puzzle grid justify-center gap-2 my-5">
                  {step.map((tile, i) => (
                    <div
                      key={i}
                      className={`tile w-14 h-14 flex items-center justify-center border-2 ${
                        tile === 0 ? 'bg-[#ccc]' : ''
                      }`}
                    >
                      {tile !== 0 ? tile : '0'}
                    </div>
                  ))}
                </div>
                {index === solution.length - 1 && (
                  <p className="font-bold text-green-800">მიღწეული შედეგი</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
