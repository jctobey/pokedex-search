import { Link, useParams } from "react-router-dom";
import SvgIcon from "../../../../components/SvgIcon/SvgIcon";
import { toStartCase } from "../../../../utils";
import { PokemonImageLarge } from "../PokemonImageLarge";
import { Pokemon } from "../../../api";

export const PokemonSummaryDetail = ({ pokemon }: { pokemon: Pokemon }) => {
  const { pokemonId } = useParams<{ pokemonId: string }>();
  const paddedPokemonId = pokemonId?.padStart(3, "0");
  return (
    <div className="h-2/5 w-full pt-4 px-4 relative">
      <div className="w-full flex items-center justify-between text-white pb-14">
        <div className="w-full flex items-center gap-2">
          <Link to="/">
            <SvgIcon name="ArrowBack" color="white" width={32} height={32} />
          </Link>
          <h3 className="text-3xl font-semibold">
            {toStartCase(pokemon.name)}
          </h3>
        </div>
        <div>
          <span className="font-semibold">{`#${paddedPokemonId}`}</span>
        </div>
      </div>
      <SvgIcon
        name="Pokeball"
        color="white"
        width={245}
        height={245}
        className="opacity-10 absolute top-0 right-0"
      />
      <PokemonImageLarge
        spriteImageUrl={pokemon.sprites.other.dream_world.front_default}
      />
    </div>
  );
};
