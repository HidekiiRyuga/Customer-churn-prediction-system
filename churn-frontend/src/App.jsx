import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";

import Prediction from "./pages/Prediction";

import Explanation from "./pages/Explanation";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/predict"
          element={<Prediction />}
        />

        <Route
          path="/explanation"
          element={<Explanation />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;