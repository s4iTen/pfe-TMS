import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetch = (fetchAction, reduxSelector) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(reduxSelector);

  const fetchData = useCallback(async () => {
    dispatch(fetchAction());
  }, [dispatch, fetchAction]);

  useEffect(() => {
    fetchData();
  }, [dispatch, fetchData]);

  return { data, loading, error };
};

export default useFetch;
