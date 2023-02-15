import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Contents } from "./views/Contents";
import "./scss/global.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contents" element={<Contents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
