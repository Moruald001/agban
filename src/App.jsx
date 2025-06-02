import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { AddClient } from "./pages/AddClient";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/login";

// import { List } from "./pages/list";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/add-client"} element={<AddClient />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/login"} element={<Login />} />
      {/* <Route path={"/list"} element={<List />} /> */}
    </Routes>
  );
}
export default App;
