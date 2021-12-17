import logo from "./logo.svg";
import "./App.css";

function App() {
  const args = JSON.parse(document.getElementById("data").text);
  return (
    <div className="App">
      <div>Wassup {args.username}</div>
    </div>
  );
}

export default App;
