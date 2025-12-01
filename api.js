const API_BASE = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemonList = async () => {
  const res = await fetch(`${API_BASE}?limit=151`);
  return res.json();
};

export const fetchPokemonDetails = async (name) => {
  const res = await fetch(`${API_BASE}/${name}`);
  return res.json();
};
