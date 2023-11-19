import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import Craftsmen from "../features/craftsmen/Craftsmen";
import { Sort, SortBy } from "@not-so-software/shared";
import TextField from "../components/TextField/TextField";
import en from "../utils/en.json";
import { useAppDispatch } from "../app/hooks";
import { getCraftsmenByPostalCode } from "../features/craftsmen/craftsmenSlice";
import { limit } from "../utils/constants/const";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

const Home = () => {
  const [index, setIndex] = useState(-1);
  const [sort, setSort] = useState<Sort>();
  const [sortBy, setSortBy] = useState<SortBy>();
  const [postalCode, setPostalCode] = useState<string>("");
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{ padding: "10px 10px" }}
      >
        <Grid item xs={12} md={6}>
          <TextField
            placeholder={en.postalCode}
            onChange={(e: any) => {
              setPostalCode(e.target.value);
            }}
            onClick={() => {
              if (postalCode)
                dispatch(
                  getCraftsmenByPostalCode({
                    page: "1",
                    limit,
                    postalCode,
                    sort,
                    sortBy,
                  })
                );
            }}
            value={postalCode}
          />
        </Grid>
        <Grid item xs={12} md={6} container justifyContent="flex-end">
          <Button
            color={index === 0 ? "primary" : "secondary"}
            onClick={() => {
              if (index !== 0) {
                setIndex(0);
                setSort("ASC");
                setSortBy("Distance");
                dispatch(
                  getCraftsmenByPostalCode({
                    page: "1",
                    limit,
                    postalCode,
                    sort: "ASC",
                    sortBy: "Distance",
                  })
                );
              } else {
                setIndex(-1);
                setSort(undefined);
                setSortBy(undefined);
                dispatch(
                  getCraftsmenByPostalCode({
                    page: "1",
                    limit,
                    postalCode,
                  })
                );
              }
            }}
          >
            {en.tabs.shortestDistance}
          </Button>
          <Button
            color={index === 1 ? "primary" : "secondary"}
            onClick={() => {
              if (index !== 1) {
                setIndex(1);
                setSort("DESC");
                setSortBy("Profile_Score");
                dispatch(
                  getCraftsmenByPostalCode({
                    page: "1",
                    limit,
                    postalCode,
                    sort: "DESC",
                    sortBy: "Profile_Score",
                  })
                );
              } else {
                setIndex(-1);
                setSort(undefined);
                setSortBy(undefined);
                dispatch(
                  getCraftsmenByPostalCode({
                    page: "1",
                    limit,
                    postalCode,
                  })
                );
              }
            }}
          >
            {en.tabs.highestRating}
          </Button>
        </Grid>
      </Grid>
      <Craftsmen postalCode={postalCode} sort={sort} sortBy={sortBy} />
    </Layout>
  );
};

export default Home;
