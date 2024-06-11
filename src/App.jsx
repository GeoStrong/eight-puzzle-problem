import { useState } from 'react';
import useLogic from '../algorithms/logic';

const App = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState('bfs');
  const { inputValues, solution, handleChange, handleSolve } =
    useLogic(activeAlgorithm);

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
