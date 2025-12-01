import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPokemonDetails } from "../services/api";

export default function Details() {
  const { name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchPokemonDetails(name).then(setData);
  }, [name]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-4 border shadow rounded-md">
      <h1 className="text-3xl font-bold capitalize mb-4">{data.name}</h1>
      <img
        src={data.sprites.front_default}
        alt={data.name}
        className="w-40 mx-auto"
      />

      <h2 className="text-xl mt-4 font-semibold">Stats:</h2>
      <ul className="mt-2">
        {data.stats.map((s) => (
          <li key={s.stat.name}>
            {s.stat.name}: <b>{s.base_stat}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
