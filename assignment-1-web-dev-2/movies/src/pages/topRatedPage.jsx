import React, { useState } from "react";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

const TopRatedPage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["topRated", { page }],
    queryFn: getTopRatedMovies,
    placeholderData: keepPreviousData,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      page={page}
      totalPages={Math.min(data.total_pages, 500)}
      onPageChange={setPage}
      action={(movie) => (
        <>
          <AddToFavoritesIcon movie={movie} />
          <AddToPlaylistIcon movie={movie} />
        </>
      )}
    />
  );
};

export default TopRatedPage;