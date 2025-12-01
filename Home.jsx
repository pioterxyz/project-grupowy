import { useState } from "react";
import { useData } from "../context/DataContext";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";

export default function Home() {
  const { items, loading } = useData();
  const [search, setSearch] = useState("");

  if (loading) return <p>Loading...</p>;

  const filtered = items.filter((el) =>
    el.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <ItemCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
