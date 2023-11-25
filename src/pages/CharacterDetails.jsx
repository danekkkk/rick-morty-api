import { useParams } from "react-router-dom";

export function CharacterDetails() {
  const { id } = useParams(); // Odczytaj parametr id z adresu URL

  // Tutaj możesz wykonać logikę pobierania danych postaci na podstawie przekazanego id i wyświetlić informacje o postaci

  return (
    <div>
      <h2>Character Details</h2>
      <p>ID: {id}</p>
      {/* Wyświetlanie szczegółowych informacji o postaci na podstawie pobranego id */}
    </div>
  );
}
