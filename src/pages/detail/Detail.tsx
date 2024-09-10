import { useQuery } from "@tanstack/react-query";
import { fetchPokemonById } from "../api";
import { useParams } from "react-router-dom";
import { ErrorPage } from "../ErrorPage";
import {
  classNames,
  getBgColorClass,
  getPrimaryPokemonType,
} from "../../utils";
import { PokemonSummaryDetail } from "./components/PokemonSummaryDetail";
import { PokemonStats } from "./components/PokemonStats";

export const Detail = () => {
  let { pokemonId } = useParams<{ pokemonId: string }>();
  const { data: pokemon } = useQuery<
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
  if (!pokemonId || !pokemon) {
    return <ErrorPage />;
  }
  const bgColorClass = getBgColorClass(getPrimaryPokemonType(pokemon));
  return (
    <div className={classNames("w-screen h-screen p-2 bottom-0", bgColorClass)}>
      <PokemonSummaryDetail pokemon={pokemon} />
      <PokemonStats />
    </div>
  );
};
