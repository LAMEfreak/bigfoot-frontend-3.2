import logo from "/logo.png";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="React logo" />
      </div>
      <h1>Bigfoot Frontend </h1>

      <div className="card">
        <Outlet />
      </div>
    </>
  );
}

export default App;
