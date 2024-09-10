export const PokemonNumber = ({ pokemonNumber }: { pokemonNumber: number }) => {
  const paddedPokemonNumber = String(pokemonNumber).padStart(3, "0");
  return (
    <div className="w-full flex justify-end pr-2 pt-1 text-grayscale-medium">
      <span className="text-[8px] md:text-xs">#{paddedPokemonNumber}</span>
    </div>
  );
};
