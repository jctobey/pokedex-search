import { Pokemon, PokemonType } from "../pages/api";

const typeBgColorMap: { [key: string]: string } = {
  bug: "bg-bug",
  dark: "bg-dark",
  dragon: "bg-dragon",
  electric: "bg-electric",
  fairy: "bg-fairy",
  fighting: "bg-fighting",
  fire: "bg-fire",
  flying: "bg-flying",
  ghost: "bg-ghost",
  grass: "bg-grass",
  ground: "bg-ground",
  ice: "bg-ice",
  normal: "bg-normal",
  poison: "bg-poison",
  psychic: "bg-psychic",
  rock: "bg-rock",
  steel: "bg-steel",
  water: "bg-water",
};

const typeTextColorMap: { [key: string]: string } = {
  bug: "text-bug",
  dark: "text-dark",
  dragon: "text-dragon",
  electric: "text-electric",
  fairy: "text-fairy",
  fighting: "text-fighting",
  fire: "text-fire",
  flying: "text-flying",
  ghost: "text-ghost",
  grass: "text-grass",
  ground: "text-ground",
  ice: "text-ice",
  normal: "text-normal",
  poison: "text-poison",
  psychic: "text-psychic",
  rock: "text-rock",
  steel: "text-steel",
  water: "text-water",
};

export const getBgColorClass = (pokemonType: string | undefined) => {
  if (!pokemonType) return ""; // Default or fallback class
  return typeBgColorMap[pokemonType.toLowerCase()] || "";
};

export const getTextColorClass = (pokemonType: string | undefined) => {
  if (!pokemonType) return ""; // Default or fallback class
  return typeTextColorMap[pokemonType.toLowerCase()] || "";
};

//primary type dictates bg and font color
export const getPrimaryPokemonType = (pokemon: Pokemon): PokemonType =>
  pokemon?.types?.[0]?.type?.name;
