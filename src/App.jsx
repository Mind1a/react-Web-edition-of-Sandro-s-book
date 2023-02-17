import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Contents } from "./views/Contents";
import { Book } from "./views/Book";
import "./scss/global.scss";
import { Preface } from "./views/Preface/Preface";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contents" element={<Contents />} />
        <Route path="/preface" element={<Preface />} />
        <Route path="/books/:book" element={<Book />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
