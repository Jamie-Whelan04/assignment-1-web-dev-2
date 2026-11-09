import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

function MovieListPageTemplate({ movies, title, action, page, totalPages, onPageChange }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [yearFilter, setYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortOption, setSortOption] = useState("default");

  const genreId = Number(genreFilter);

  
  let displayedMovies = movies
    .filter((m) => (m.title || "").toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true))
    .filter((m) => (yearFilter ? (m.release_date || "").startsWith(yearFilter) : true))
    .filter((m) => (m.vote_average || 0) >= ratingFilter);

  
  const sorters = {
    "rating-desc": (a, b) => b.vote_average - a.vote_average,
    "rating-asc": (a, b) => a.vote_average - b.vote_average,
    "date-desc": (a, b) => (b.release_date || "").localeCompare(a.release_date || ""),
    "date-asc": (a, b) => (a.release_date || "").localeCompare(b.release_date || ""),
    "title-asc": (a, b) => a.title.localeCompare(b.title),
    "title-desc": (a, b) => b.title.localeCompare(a.title),
  };

  if (sorters[sortOption]) {
    displayedMovies = [...displayedMovies].sort(sorters[sortOption]);
  }

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "year") setYearFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "sort") setSortOption(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid key="find" size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            yearFilter={yearFilter}
            ratingFilter={ratingFilter}
            sortOption={sortOption}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies} />
      </Grid>
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", my: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, p) => {
              onPageChange(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Grid>
  );
}

export default MovieListPageTemplate;