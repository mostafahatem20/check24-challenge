import { craftsmenAxios } from "../../utils/axios";
import { GetCraftsmen } from "@not-so-software/shared";

export const getCraftsmen = ({
  page,
  limit,
  postalCode,
  sort,
  sortBy,
}: GetCraftsmen) => {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(postalCode && { postalCode }),
    ...(sort && { sort }),
    ...(sortBy && { sortBy }),
  });
  return craftsmenAxios.get(`?${queryParams.toString()}`);
};
