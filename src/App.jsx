import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Bigfoot Frontend </h1>
      <div className="card">
        <Outlet />
      </div>
    </>
  );
}

export default App;
