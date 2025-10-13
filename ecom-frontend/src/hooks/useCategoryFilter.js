import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getCategoriesForDashboard } from "../store/actions";

const useCategoryFilter = () => {
  const [searchParams] = useSearchParams(); // Access search params from the URL
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(); // Create new URLSearchParams object

    // Get current page from URL search params, defaulting to 1 if not present

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage - 1);

    const queryString = params.toString();
    console.log("Query String ", queryString);

    dispatch(getCategoriesForDashboard(queryString));
  }, [dispatch, searchParams]);
};

export default useCategoryFilter;
