import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Favorites } from "./pages/Favorites";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { CharacterDetails } from "./pages/CharacterDetails";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/rick-morty-api/" element={<Home />} />
          <Route path="/rick-morty-api/search" element={<Search />} />
          <Route path="/rick-morty-api/favorites" element={<Favorites />} />
          <Route path="/rick-morty-api/login" element={<Login />} />
          <Route path="/rick-morty-api/register" element={<Register />} />
          <Route
            path="/rick-morty-api/character/:id"
            element={<CharacterDetails />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
