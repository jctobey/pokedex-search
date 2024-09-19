import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import { ReactNode, useCallback, useRef } from "react";
import { PokemonCardLink } from "../PokemonCardLink";
import { PokemonNumber } from "../PokemonNumber";
import { PokemonImage } from "../PokemonImage";
import { PokemonName } from "../PokemonName";
import { fetchPokemonById, fetchPokemonList } from "../../../api";
import { PokeballLoader } from "../../../../components/PokeballLoader";

const ListContainerLayout = ({ children }: { children: ReactNode }) => (
  <div className="bg-white rounded-lg w-full overflow-scroll h-[87vh] py-6 px-3 shadow-inner shadow-gray-300 grid grid-cols-3 gap-1 md:gap-1.5 md:grid-cols-9 md:h-[91vh]">
    {children}
  </div>
);

export const ListContainer = () => {
  const {
    data: pokemon,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["pokemon", "list"],
    queryFn: fetchPokemonList,
    initialPageParam: "0",
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next
        ? new URL(lastPage.next).searchParams.get("offset")
        : undefined;
    },
  });

  // Now correctly map over the Pokémon objects directly in the `pages`
  const pokemonQueries = useQueries({
    queries: pokemon
      ? pokemon.pages.flatMap((page) =>
          // Since page is an array of Pokémon objects, map over it
          page.results.map((pokemonObj) => {
            // Extract the Pokémon ID from the URL
            const parts = pokemonObj.url.split("/");
            const id = parts[parts.length - 2];
            return {
              queryKey: ["pokemon", id],
              queryFn: () => fetchPokemonById(id),
            };
          })
        )
      : [], // if pokemon is undefined, return an empty array
  });

  const isLoading = pokemonQueries.some((query) => query.status === "pending");
  const isError = pokemonQueries.some((query) => query.status === "error");

  const observer = useRef<IntersectionObserver | null>();
  const lastPokemonElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries?.[0].isIntersecting &&
          (hasNextPage || !isFetchingNextPage)
        ) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  if (status === "pending")
    return (
      <ListContainerLayout>
        <div className="col-span-full justify-self-center content-center h-dvh">
          <PokeballLoader />
        </div>
      </ListContainerLayout>
    );

  if (status === "error") {
    return <ListContainerLayout>Error</ListContainerLayout>;
  }

  return (
    <ListContainerLayout>
      {pokemonQueries.map((pokemonQueryData, index) => {
        const isLastPokemon = index + 1 === pokemonQueries.length;
        if (pokemonQueryData.data) {
          return (
            <div ref={isLastPokemon ? lastPokemonElementRef : undefined}>
              <PokemonCardLink pokemonId={pokemonQueryData.data?.id}>
                <PokemonNumber pokemonNumber={pokemonQueryData.data?.id} />
                <PokemonImage
                  spriteImageUrl={
                    pokemonQueryData.data.sprites.other.dream_world
                      .front_default
                  }
                  pokemonName={pokemonQueryData.data.name}
                />
                <PokemonName pokemonName={pokemonQueryData.data?.name || ""} />
              </PokemonCardLink>
            </div>
          );
        }
        return null;
      })}
    </ListContainerLayout>
  );
};
