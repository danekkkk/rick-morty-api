import "../App.css";
import { AsideMenu } from "../components/AsideMenu/AsideMenu";
import { SearchList } from "../components/SearchList/SearchList";

export function Search() {
  return (
    <>
      <main className="container">
        <AsideMenu />
        <div className="aside"></div>
        <div className="source">
          <SearchList />
        </div>
      </main>
    </>
  );
}
