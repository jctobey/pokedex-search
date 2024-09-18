import { useQuery } from "@tanstack/react-query";
import { fetchPokemonById, fetchPokemonSpeciesDetailsById } from "../../../api";
import { useParams } from "react-router-dom";
import { PokeTypePill } from "../PokeTypePill";
import {
  classNames,
  getBgColorClass,
  getPrimaryPokemonType,
  getTextColorClass,
  toStartCase,
} from "../../../../utils";
import { ErrorPage } from "../../../ErrorPage";
import SvgIcon from "../../../../components/SvgIcon/SvgIcon";
import { toTitleCase } from "../../../../utils/toTitleCase";
import { StatIndicator } from "./components/StatBar";

const statLabelMap: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SATK",
  "special-defense": "SDEF",
  speed: "SPD",
};

export const PokemonStats = () => {
  const { pokemonId } = useParams();
  const { data: pokemon, status: pokemonDetailStatus } = useQuery<
    Awaited<ReturnType<typeof fetchPokemonById>>
  >({
    queryKey: ["pokemon", pokemonId],
    queryFn: () => {
      if (!pokemonId) {
        throw new Error("Missing Pokemon Id");
      }
      return fetchPokemonById(pokemonId);
    },
  });
  const { data: speciesData, status: speciesStatus } = useQuery<
    Awaited<ReturnType<typeof fetchPokemonSpeciesDetailsById>>
  >({
    queryKey: ["pokemon-species", pokemonId],
    queryFn: () => {
      if (!pokemonId) {
        throw new Error("Missing Pokemon Id");
      }
      return fetchPokemonSpeciesDetailsById(pokemonId);
    },
  });
  if (pokemonDetailStatus || speciesStatus === "pending") {
    <div>Loading...</div>;
  }
  if (!pokemon || !speciesStatus) {
    return <ErrorPage />;
  }

  const primaryPokemonType = getPrimaryPokemonType(pokemon);
  const textColorClass = getTextColorClass(primaryPokemonType);
  const bgColorClass = getBgColorClass(primaryPokemonType);
  const weightKg = pokemon.weight / 10;
  const heightMeters = pokemon.height / 10;
  const firstTwoMoves = pokemon.moves.slice(0, 2);
  const englishFlavorTextEntries =
    speciesData?.flavor_text_entries.filter(
      (entry) => entry.language.name === "en"
    ) || [];
  const randomEnglishFlavorText = englishFlavorTextEntries?.length
    ? Math.floor(Math.random() * englishFlavorTextEntries.length)
    : 0;
  return (
    <div className="bg-white rounded-lg w-full h-[65%] pt-12 px-4 shadow-inner shadow-gray-300 overflow-scroll md:h-full">
      <div className="flex justify-center gap-4 w-full">
        {pokemon?.types.map(({ type }) => (
          <PokeTypePill pokemonType={type.name}>
            {toStartCase(type.name)}
          </PokeTypePill>
        ))}
      </div>
      <div className="flex text-center p-2 pt-2">
        <h4
          className={classNames("text-lg font-semibold w-full", textColorClass)}
        >
          About
        </h4>
      </div>
      <div className="grid grid-cols-3 w-full text-center">
        <div className="flex justify-center items-center gap-2 border-r border-grayscale-light">
          <SvgIcon name="Weight" height={16} width={16} />
          <span className="font-light text-xs">{`${weightKg} kg`}</span>
        </div>
        <div className="flex justify-center items-center gap-2 border-r border-grayscale-light">
          <SvgIcon
            name="Straighten"
            height={16}
            width={16}
            className="rotate-90"
          />
          <span className="font-light text-xs">{`${heightMeters} m`}</span>
        </div>
        <div className="flex justify-center flex-col text-left pl-3 gap-1">
          {firstTwoMoves.map(({ move }) => (
            <span className="font-light text-xs">
              {toTitleCase(move.name, "-")}
            </span>
          ))}
        </div>
        <span className="text-xxs text-grayscale-medium border-r border-grayscale-light pt-1">
          Weight
        </span>
        <span className="text-xxs text-grayscale-medium border-r border-grayscale-light pt-1">
          Height
        </span>
        <span className="text-xxs text-grayscale-medium pt-1">Moves</span>
      </div>
      <p className="pt-6 pb-2 text-xs font-light">
        {englishFlavorTextEntries[randomEnglishFlavorText]?.flavor_text}
      </p>
      <div className="flex text-center p-2 py-3">
        <h4
          className={classNames("text-lg font-semibold w-full", textColorClass)}
        >
          Base Stats
        </h4>
      </div>
      <div className="text-right">
        {pokemon.stats.map((stat) => {
          const statLabel = statLabelMap[stat.stat.name];
          return (
            <StatIndicator
              key={statLabel}
              stat={statLabel}
              statValue={stat.base_stat}
              textColorClass={textColorClass}
              bgColorClass={bgColorClass}
            />
          );
        })}
      </div>
    </div>
  );
};
