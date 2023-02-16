import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Book } from "./views/Book";
import "./scss/global.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:book" element={<Book />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
