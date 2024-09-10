import SvgIcon from "../../../../components/SvgIconButton/SvgIcon";

export const SearchHeader = () => {
  return (
    <div className="flex px-4 py-4 gap-4 flex-wrap">
      <div className="flex justify-start items-center w-full gap-4">
        <SvgIcon name="Pokeball" color="white" height={32} width={32} />
        <h2 className="text-white flex-grow font-bold text-3xl">Pokédex</h2>
      </div>
    </div>
  );
};
