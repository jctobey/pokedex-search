export const PokemonImageLarge = ({
  spriteImageUrl,
  pokemonName,
}: {
  spriteImageUrl: string;
  pokemonName: string;
}) => (
  <div className="flex justify-center">
    <div className="w-[200px] h-[200px] pb-4">
      <img
        className="object-contain object-center w-full h-full z-100"
        src={spriteImageUrl}
        alt={pokemonName}
      />
    </div>
  </div>
);
