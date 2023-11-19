import React from "react";
import { Virtuoso } from "react-virtuoso";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCraftsmenByPostalCode, selectCraftsmen } from "./craftsmenSlice";
import Card from "../../components/Card/Card";
import { limit } from "../../utils/constants/const";
import { Sort, SortBy } from "@not-so-software/shared";

const Footer = ({ context: { loadMore, loading } }: any) => {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button disabled={loading} onClick={loadMore}>
        {loading ? "Loading..." : "Press to load more"}
      </button>
    </div>
  );
};

const NoRecords = ({ context: { loading } }: any) => {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      No results found. Please enter a new postal code.
    </div>
  );
};

interface ICraftsmen {
  postalCode: string;
  sortBy?: SortBy;
  sort?: Sort;
}
const Craftsmen: React.FC<ICraftsmen> = ({ sort, sortBy, postalCode }) => {
  const dispatch = useAppDispatch();
  const craftsmenState = useAppSelector(selectCraftsmen);
  const [page, setPage] = useState(1);

  return (
    <Virtuoso
      context={{
        loadMore: () => {
          setPage(page + 1);
          dispatch(
            getCraftsmenByPostalCode({
              page: `${page + 1}`,
              limit,
              postalCode,
              sort,
              sortBy,
            })
          );
        },
        loading: craftsmenState.status === "loading",
      }}
      style={{ height: "100vh", backgroundColor: "#F8F8F8" }}
      data={craftsmenState.craftsmen}
      itemContent={(index, craftsman) => {
        return (
          <div>
            <Card {...craftsman} />
          </div>
        );
      }}
      components={
        craftsmenState.craftsmen.length > 0 ||
        craftsmenState.status === "loading"
          ? { Footer }
          : { Footer: NoRecords }
      }
    />
  );
};

export default Craftsmen;
