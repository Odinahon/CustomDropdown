import logo from './logo.svg';
import './App.css';
import SelectComponent from './SelectComponent';
import "./styles.css";
import { useState } from 'react';

const options = [
  {key: 1, value: "Test 1"},
  {key: 2, value: "Test 2"},
  {key: 3, value: "Test 3"},
  {key: 4, value: "Test 4"},
]
function App() {
  const [selectedOption, setSelectedOption] = useState(2);

  return (
    <div className='App'>
      <h1>Custom Dropdown</h1>
     <SelectComponent options ={options} onChange={(item) => setSelectedOption(item)} selectedKey={selectedOption} placeholder={"type to search"}></SelectComponent>
     <p>selected option: {selectedOption}</p>
    </div>
  );
}

export default App;
