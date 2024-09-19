import { Link, useParams } from "react-router-dom";
import SvgIcon from "../../../../components/SvgIcon/SvgIcon";
import { toStartCase } from "../../../../utils";
import { PokemonImageLarge } from "../PokemonImageLarge";
import { Pokemon } from "../../../api";

export const PokemonSummaryDetail = ({ pokemon }: { pokemon: Pokemon }) => {
  const { pokemonId } = useParams<{ pokemonId: string }>();
  const paddedPokemonId = pokemonId?.padStart(3, "0");
  return (
    <div className="h-[35%] w-full pt-4 px-4">
      <div className="w-full flex items-center justify-between text-white">
        <div className="w-full flex items-center gap-2">
          <Link to="/">
            <SvgIcon name="ArrowBack" color="white" width={32} height={32} />
          </Link>
          <h1 className="text-2xl font-semibold">
            {toStartCase(pokemon.name)}
          </h1>
        </div>
        <div>
          <span className="font-semibold text-xs md:text-lg">{`#${paddedPokemonId}`}</span>
        </div>
      </div>
      <div className="relative">
        <PokemonImageLarge
          spriteImageUrl={pokemon.sprites.other.dream_world.front_default}
          pokemonName={pokemon.name}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="white"
            className="opacity-10 absolute -top-12 -right-6 md:right-[26%] w-52 h-52 md:w-80 md:h-80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M29.7144 24C29.7144 27.1559 27.156 29.7143 24.0001 29.7143C20.8442 29.7143 18.2858 27.1559 18.2858 24C18.2858 20.8441 20.8442 18.2857 24.0001 18.2857C27.156 18.2857 29.7144 20.8441 29.7144 24Z" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24.0001 48C36.0909 48 46.0934 39.0593 47.7571 27.4286H33.7006C32.2885 31.4235 28.4786 34.2857 24.0001 34.2857C19.5217 34.2857 15.7117 31.4235 14.2997 27.4286H0.243164C1.90681 39.0593 11.9094 48 24.0001 48ZM14.2997 20.5714H0.243164C1.90681 8.94071 11.9094 0 24.0001 0C36.0909 0 46.0934 8.94071 47.7571 20.5714H33.7006C32.2885 16.5765 28.4786 13.7143 24.0001 13.7143C19.5217 13.7143 15.7117 16.5765 14.2997 20.5714ZM29.7144 24C29.7144 27.1559 27.156 29.7143 24.0001 29.7143C20.8442 29.7143 18.2858 27.1559 18.2858 24C18.2858 20.8441 20.8442 18.2857 24.0001 18.2857C27.156 18.2857 29.7144 20.8441 29.7144 24Z"
            />
          </svg>
        </PokemonImageLarge>
      </div>
    </div>
  );
};
