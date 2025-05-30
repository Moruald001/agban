import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { AddClient } from "./pages/addClient";
// import { List } from "./pages/list";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/add-client"} element={<AddClient />} />
      {/* <Route path={"/list"} element={<List />} /> */}
    </Routes>
  );
}
export default App;
