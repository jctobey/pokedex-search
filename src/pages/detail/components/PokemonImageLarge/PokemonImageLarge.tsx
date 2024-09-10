export const PokemonImageLarge = ({
  spriteImageUrl,
}: {
  spriteImageUrl: string;
}) => (
  <div className="flex justify-center">
    <div className="w-[200px] h-[200px] pb-4">
      <img
        className="object-contain object-center w-full h-full z-100"
        src={spriteImageUrl}
      />
    </div>
  </div>
);
