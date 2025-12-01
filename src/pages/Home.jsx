import { useState } from "react";
import { useData } from "../context/DataContext";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";

export default function Home() {
  const { items, loading } = useData();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [goPage, setGoPage] = useState("");

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

      {/* PAGINACJA */}
      <div className="flex flex-col items-center gap-4 mt-6">

        {/* ---- GŁÓWNA PAGINACJA ---- */}
        <div className="flex items-center gap-2">

          {/* Strona w lewo */}
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className="px-3 py-1 border rounded bg-white"
          >
            ‹
          </button>

          {/* Dynamiczne strony */}
          {getVisiblePages(currentPage, totalPages).map((p, i) =>
            p === "..." ? (
              <span key={i} className="px-3">…</span>
            ) : (
              <button
                key={i}
                onClick={() => setCurrentPage(p)}
                className={`px-3 py-1 border rounded ${currentPage === p ? "bg-blue-500 text-white" : "bg-white"
                  }`}
              >
                {p}
              </button>
            )
          )}

          {/* Strona w prawo */}
          <button
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            className="px-3 py-1 border rounded bg-white"
          >
            ›
          </button>

        </div>

        {/* ---- "Przejdź do strony" ---- */}
        <div className="flex items-center gap-2">
          <span>Idź do:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={goPage}
            onChange={(e) => setGoPage(e.target.value)}
            className="w-20 p-1 border rounded"
          />
          <button
            onClick={() => {
              if (goPage >= 1 && goPage <= totalPages) {
                setCurrentPage(Number(goPage));
                setGoPage("");
              }
            }}
            className="px-3 py-1 border rounded bg-blue-500 text-white"
          >
            OK
          </button>
        </div>

      </div>
    </div>
  );
}