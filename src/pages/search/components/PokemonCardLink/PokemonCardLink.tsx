import { Link } from "react-router-dom";
import { ReactNode } from "react";

export const PokemonCardLink = ({
  pokemonId,
  children,
}: {
  pokemonId: number;
  children: ReactNode;
}) => {
  return (
    <div className="max-w-56 max-h-full">
      <Link to={`./${String(pokemonId)}`}>
        <div className="relative border border-grayscale-background rounded-lg drop-shadow-md h-full">
          <div className="bg-gray-100 h-2/5 w-full p-2 absolute rounded-md bottom-0 z-0" />
          <div className="relative w-full h-full">
            <div className="z-10 w-full pb-2">{children}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};
