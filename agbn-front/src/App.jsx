import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { AddClient } from "./pages/AddClient";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/login";
import { NotFound } from "./pages/notFound";
import { List } from "./pages/List";
import { Guard } from "./pages/auth/Guard";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/add-client"} element={<AddClient />} />

      <Route
        path={"/register"}
        element={
          <Guard>
            <Register />{" "}
          </Guard>
        }
      />
      <Route
        path={"/login"}
        element={
          <Guard>
            <Login />{" "}
          </Guard>
        }
      />
      <Route path={"/list"} element={<List />} />

      <Route path={"*"} element={<NotFound />} />

      {/* <Route path={"/list"} element={<List />} /> */}
    </Routes>
  );
}
export default App;
