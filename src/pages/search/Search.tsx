import { ListContainer } from "./components/ListContainer";
import { SearchHeader } from "./components/SearchHeader";

export const Search = () => {
  return (
    <div className="p-2 h-dvh w-dvw bg-primary">
      <SearchHeader />
      <ListContainer />
    </div>
  );
};
