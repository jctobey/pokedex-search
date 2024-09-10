import { ReactNode } from "react";
import { classNames, getBgColorClass } from "../../../../utils";
import { PokemonType } from "../../../api";

export const PokeTypePill = ({
  pokemonType,
  children,
}: {
  pokemonType: PokemonType;
  children: ReactNode;
}) => {
  const bgColorClass = getBgColorClass(pokemonType);
  return (
    <span
      className={classNames(
        "text-white font-semibold py-1 px-2 rounded-full text-sm",
        bgColorClass
      )}
    >
      {children}
    </span>
  );
};
