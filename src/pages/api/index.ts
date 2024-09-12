export type Pokemon = {
  name: string;
  id: number;
  types: { type: { name: PokemonType } }[];
  sprites: { other: { dream_world: { front_default: string } } };
  weight: number;
  height: number;
  moves: { move: { name: string; url: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};

export type PokemonType =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "normal"
  | "grass"
  | "ground"
  | "ice"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

export const fetchPokemonList = async (
  offset: number
): Promise<{ name: string; url: string }[]> => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return (await response.json()).results;
};

export const fetchPokemonById = async (id: string): Promise<Pokemon> => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export const fetchPokemonSpeciesDetailsById = async (
  id: string
): Promise<{
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}> => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};
