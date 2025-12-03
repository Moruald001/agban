import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import { NotFound } from "./pages/NotFound";
import { List } from "./pages/List";
import { Guard, Protected, Verified } from "./pages/auth/Guard";
import ListDetails from "./pages/ListDetails";
import Profil from "./pages/Profil";
import Verify from "./pages/auth/Verify";
import SuccessRegistry from "./pages/auth/SuccessRegistry";
import { useEffect } from "react";
import { setNavigate } from "../utils/navigate";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <Routes>
      <Route path={"/"} element={<Home />} />

      <Route
        path={"/profil"}
        element={
          <Protected>
            <Profil />
          </Protected>
        }
      />

      <Route path="/verify" element={<Verify />} />
      <Route path="/success-register" element={<SuccessRegistry />} />
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
            <Login />
            //{" "}
          </Guard>
        }
      />

      <Route
        path={"/list"}
        element={
          <Protected>
            <Verified>
              <List />{" "}
            </Verified>
          </Protected>
        }
      />
      <Route
        path={"/list-details/:id"}
        element={
          <Protected>
            <Verified>
              {" "}
              <ListDetails />{" "}
            </Verified>
          </Protected>
        }
      />

      <Route path={"*"} element={<NotFound />} />

      {/* <Route path={"/list"} element={<List />} /> */}
    </Routes>
  );
}
export default App;
