export const PokemonImage = ({
  spriteImageUrl,
}: {
  spriteImageUrl: string;
}) => (
  <div className="flex justify-center">
    <div className="w-[75px] h-[75px]  pb-4 md:h-[150px] md:w-[150px]">
      <img
        className="object-contain object-center w-full h-full"
        src={spriteImageUrl}
      />
    </div>
  </div>
);
