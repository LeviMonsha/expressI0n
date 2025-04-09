import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthPage from "./page/AuthPage";
import HomePage from "./page/HomePage";
import HeaderComponent from "./component/HeaderComponent";

function App() {
  return (
    <Router>
      <>
        <HeaderComponent logoutUrl={"/"} />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
