import { useCallback, useState } from "react";
import store from "../redux/Store/store";

export const usePagination = (fetch, payload = {}, resCallback = () => {}, errCallback = () => {}) => {
  const { dispatch } = store;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");

  const fetchData = useCallback(() => {
    const updatedPayload = {
      ...payload,
      page,
      limit,
      search,
      sortBy,
      sortType,
    };

    dispatch(fetch(updatedPayload))
      .unwrap()
      .then((res) => {
        resCallback(res);
      })
      .catch((err) => {
        errCallback(err);
      });
  }, [fetch, page, limit, search, sortBy, sortType, payload]);

  return {
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    sortBy,
    setSortBy,
    sortType,
    setSortType,
    fetchData,
  };
};
