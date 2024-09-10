import { useQuery } from "@tanstack/react-query";
import { fetchPokemonById } from "../../../api";
import { useParams } from "react-router-dom";
import { PokeTypePill } from "../PokeTypePill";
import {
  classNames,
  getPrimaryPokemonType,
  getTextColorClass,
  toStartCase,
} from "../../../../utils";
import { ErrorPage } from "../../../ErrorPage";
import SvgIcon from "../../../../components/SvgIconButton/SvgIcon";
import { text } from "stream/consumers";

export const PokemonStats = () => {
  const { pokemonId } = useParams();
  const { data: pokemon, status } = useQuery<
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
  if (status === "pending") {
    <div>Loading...</div>;
  }
  if (!pokemon) {
    return <ErrorPage />;
  }

  const primaryPokemonType = getPrimaryPokemonType(pokemon);
  const textColorClass = getTextColorClass(primaryPokemonType);
  return (
    <div className="bg-white rounded-lg w-full overflow-scroll h-3/5 pb-4 pt-16 px-4 shadow-inner shadow-gray-300">
      <div className="flex justify-center gap-4 w-full">
        {pokemon?.types.map(({ type }) => (
          <PokeTypePill pokemonType={type.name}>
            {toStartCase(type.name)}
          </PokeTypePill>
        ))}
      </div>
      <div className="flex text-center p-2">
        <h4
          className={classNames("text-lg font-semibold w-full", textColorClass)}
        >
          About
        </h4>
      </div>
      <div className="grid grid-cols-3 gap-1 w-full">
        <div className="flex justify-center">
          <SvgIcon name="Weight" height={16} width={16} />
        </div>
        <div className="flex justify-center">
          <SvgIcon name="Straighten" height={16} width={16} />
        </div>
        <div className="flex justify-center">
          <span>Moves</span>
        </div>
      </div>
    </div>
  );
};
