import { useQueries, useQuery } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { PokemonCardLink } from "../PokemonCardLink";
import { PokemonNumber } from "../PokemonNumber";
import { PokemonImage } from "../PokemonImage";
import { PokemonName } from "../PokemonName";
import { fetchPokemonById, fetchPokemonList } from "../../../api";

const ListContainerLayout = ({ children }: { children: ReactNode }) => (
  <div className="bg-white rounded-lg w-full overflow-scroll h-[93%] py-6 px-3 shadow-inner shadow-gray-300 grid grid-cols-3 gap-1 md:gap-1.5 md:grid-cols-9">
    {children}
  </div>
);

export const ListContainer = () => {
  const [offset, setOffset] = useState<number>(0);

  const { data: pokemon } = useQuery<
    { name: string; url: string }[],
    unknown,
    { name: string; url: string }[]
  >({
    queryKey: ["pokemon", "list", `offset=${offset}`],
    queryFn: () => fetchPokemonList(offset),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Then get the users messages
  const pokemonQueries = useQueries({
    queries: pokemon
      ? pokemon.map(({ url }) => {
          const parts = url.split("/");
          const id = parts[parts.length - 2];
          return {
            queryKey: ["pokemon", id],
            queryFn: () => fetchPokemonById(id),
          };
        })
      : [], // if users is undefined, an empty array will be returned
  });
  const isLoading = pokemonQueries.some((query) => query.status === "pending");
  const isError = pokemonQueries.some((query) => query.status === "error");

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <ListContainerLayout>Error</ListContainerLayout>;
  }
  return (
    <ListContainerLayout>
      {pokemonQueries.map((pokemonQueryData) => {
        if (pokemonQueryData.data) {
          return (
            <PokemonCardLink pokemonId={pokemonQueryData.data?.id}>
              <PokemonNumber pokemonNumber={pokemonQueryData.data?.id} />
              <PokemonImage
                spriteImageUrl={
                  pokemonQueryData.data.sprites.other.dream_world.front_default
                }
              />
              <PokemonName pokemonName={pokemonQueryData.data?.name || ""} />
            </PokemonCardLink>
          );
        }
        return null;
      })}
    </ListContainerLayout>
  );
};
