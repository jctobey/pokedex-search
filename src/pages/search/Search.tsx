import { ListContainer } from "./components/ListContainer";
import { SearchHeader } from "./components/SearchHeader";

export const Search = () => {
  return (
    <div className="p-2 bg-primary h-dvh">
      <SearchHeader />
      <ListContainer />
    </div>
  );
};
