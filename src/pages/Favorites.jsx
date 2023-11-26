import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AsideMenu } from "../components/AsideMenu/AsideMenu";
import { FavoritesList } from "../components/FavoritesList/FavoritesList";
import "../App.css";

export function Favorites() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLoggedInStatus === "true");
  }, []);

  if (!isLoggedIn) {
    return navigate("/rick-morty-api/login");
  }

  return (
    <main className="container">
      <AsideMenu />
      <div className="aside"></div>
      <div className="source">
        <FavoritesList />
      </div>
    </main>
  );
}
