import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Contents } from "./views/Contents";
import { Book } from "./views/Book";
import "./scss/global.scss";
import { Preface } from "./views/Preface/Preface";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contents" element={<Contents />} />
      <Route path="/preface" element={<Preface />} />
      <Route path="/books/:book" element={<Book />} />
    </Routes>
  );
}

export default App;
