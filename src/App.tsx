import { BrowserRouter, Route, Routes } from "react-router";
import { GameProvider } from "./context/GameContext";
import Layout from "./layouts/Layout";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Route>
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
