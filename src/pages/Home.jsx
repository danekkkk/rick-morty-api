import "../App.css";
import { AsideMenu } from "../components/AsideMenu/AsideMenu";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <main className="container">
        <AsideMenu />
        <div className="aside"></div>
        <div className="main">
          <h1 className="primaryHeading">
            W naszej bazie znajduje się ponad 800 bohaterów <br /> z serialu
            Rick & Morty
          </h1>
          <p className="description">
            Zarejestruj się na naszą platformę aby móc polubić swoje <br />
            ulubione postacie i mieć ja na wyciągnięcie ręki!
          </p>
          <Link to="/register" className="cta">
            Zarejestruj się!
          </Link>
        </div>
      </main>
    </>
  );
}
