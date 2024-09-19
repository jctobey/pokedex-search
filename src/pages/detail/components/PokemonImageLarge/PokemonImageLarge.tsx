import { ReactNode } from "react";

export const PokemonImageLarge = ({
  spriteImageUrl,
  pokemonName,
  children,
}: {
  spriteImageUrl: string;
  pokemonName: string;
  children?: ReactNode;
}) => (
  <div className="flex justify-center">
    <div className="w-[200px] h-[200px] md:h-[325px] md:w-[325px]">
      <img
        className="object-contain object-center w-full h-full  z-100 relative"
        src={spriteImageUrl}
        alt={pokemonName}
      />
    </div>
    {children}
  </div>
);
