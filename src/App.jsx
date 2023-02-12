import "./App.scss";
import { Loader } from "./components/Loader";
import { Navigation } from "./components/Navigation/Navigation";
function App() {
  return (
    <div className="App">
      <Loader width={"50%"} />
      <Navigation />
    </div>
  );
}

export default App;
