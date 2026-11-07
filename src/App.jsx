import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Home";
import Game from "./pages/Game";
import HowToPlay from "./pages/HowToPlay";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="gioca/:categoryId" element={<Game />} />
        <Route path="come-si-gioca" element={<HowToPlay />} />
        <Route path="profilo" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
