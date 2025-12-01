import { useState } from "react";
import { useData } from "../context/DataContext";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";

export default function Home() {
  const { items, loading } = useData();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  if (loading) return <p>Loading...</p>;

  const filtered = items
    .filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  function getVisiblePages(currentPage, totalPages) {
    const pages = [];
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  }

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentItems.map((item) => (
          <ItemCard key={item.name} item={item} />
        ))}
      </div>
      <div className="flex gap-2 justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded 
              ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white text-black"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
