import { useState } from "react";
import "./App.css";
import { SearchBar } from "./Components/SearchBar";

function App() {

  const [result, setResult] = useState([]);
  
  return (
    <div className="App">
      <SearchBar result={result} setResult={setResult} />
    </div>
  );
}

export default App;
