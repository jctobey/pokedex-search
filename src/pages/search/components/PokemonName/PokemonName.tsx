import { toStartCase } from "../../../../utils";

export const PokemonName = ({ pokemonName }: { pokemonName: string }) => {
  const startCaseName = toStartCase(pokemonName);
  return (
    <div className="absolute bottom-1 text-xxs flex w-full justify-center text-center z-20 md:text-xs">
      <span className="font-light">{startCaseName}</span>
    </div>
  );
};
