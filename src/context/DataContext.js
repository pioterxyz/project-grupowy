import { createContext, useContext, useEffect, useState } from "react";
import { fetchPokemonList } from "../services/api";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export default function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemonList().then((data) => {
      setItems(data.results);
      setLoading(false);
    });
  }, []);

  return (
    <DataContext.Provider value={{ items, loading }}>
      {children}
    </DataContext.Provider>
  );
}

