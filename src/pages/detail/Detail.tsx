import { useQuery } from "@tanstack/react-query";
import { fetchPokemonById } from "../api";
import { useParams } from "react-router-dom";
import {
  classNames,
  getBgColorClass,
  getPrimaryPokemonType,
} from "../../utils";
import { PokemonSummaryDetail } from "./components/PokemonSummaryDetail";
import { PokemonStats } from "./components/PokemonStats";
import { PokeballLoader } from "../../components/PokeballLoader";
import { ErrorPage } from "../ErrorPage";
import { ReactNode } from "react";

const DetailLayout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

export const Detail = () => {
  let { pokemonId } = useParams<{ pokemonId: string }>();
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

  if (status === "pending" || !pokemon) {
    return (
      <div className="flex justify-center items-center h-dvh w-dvw">
        <PokeballLoader />
      </div>
    );
  }

  if (status === "error") {
    return <ErrorPage />;
  }

  const bgColorClass = getBgColorClass(getPrimaryPokemonType(pokemon));
  return (
    <DetailLayout
      className={classNames("w-screen h-screen p-2 bottom-0", bgColorClass)}
    >
      <PokemonSummaryDetail pokemon={pokemon} />
      <PokemonStats />
    </DetailLayout>
  );
};
