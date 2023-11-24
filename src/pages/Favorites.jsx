import { CharacterList } from "../components/CharacterList/CharacterList";
import "../App.css";
import { AsideMenu } from "../components/AsideMenu/AsideMenu";

export function Favorites() {
  return (
    <>
      <main className="container">
        <AsideMenu />
        <div className="aside"></div>
        <div className="source">
          <CharacterList />
        </div>
      </main>
    </>
  );
}
