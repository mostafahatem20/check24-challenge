import React from "react";
import { Virtuoso } from "react-virtuoso";
import { useState, useEffect } from "react";
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
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(
      getCraftsmenByPostalCode({
        page: `${page}`,
        limit,
        postalCode,
        sort,
        sortBy,
      })
    );
    // eslint-disable-next-line
  }, [page]);
  return (
    <Virtuoso
      context={{
        loadMore: () => setPage(page + 1),
        loading: craftsmenState.status === "loading",
      }}
      style={{ height: 500, backgroundColor: "#F8F8F8" }}
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
