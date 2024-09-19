import { toStartCase } from "../../../../utils";

export const PokemonName = ({ pokemonName }: { pokemonName: string }) => {
  const startCaseName = toStartCase(pokemonName);
  return (
    <div className="absolute bottom-1 flex w-full justify-center text-center z-20 text-xs md:text-sm">
      <span className="font-light">{startCaseName}</span>
    </div>
  );
};
