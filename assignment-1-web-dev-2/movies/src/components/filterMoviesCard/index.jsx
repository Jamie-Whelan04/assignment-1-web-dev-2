import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";

export default function FilterMoviesCard(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const genres = data.genres;
  if (genres[0]?.name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleTextChange = (e, type) => {
    props.onUserInput(type, e.target.value);
  };

  const handleSliderChange = (e, value) => {
    props.onUserInput("rating", value);
  };

  return (
    <Card sx={{ backgroundColor: "rgb(255, 255, 255)", color: "text.primary" }}>
      <CardContent>
        <Typography variant="h5" component="h1">
          <FilterAltIcon fontSize="large" />
          Filter movies
        </Typography>

        
        <TextField
          sx={{ margin: 1, minWidth: 220 }}
          id="filled-search"
          label="Search Title"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={(e) => handleTextChange(e, "name")}
        />

        {/* Genre selection dropdown */}
        <FormControl sx={{ margin: 1, minWidth: 220 }}>
          <InputLabel id="genre-select-label">Genre</InputLabel>
          <Select
            labelId="genre-select-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={(e) => handleTextChange(e, "genre")}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        
        <TextField
          sx={{ margin: 1, minWidth: 220 }}
          id="year-search"
          label="Release Year (e.g. 2024)"
          type="text"
          variant="filled"
          value={props.yearFilter}
          onChange={(e) => handleTextChange(e, "year")}
        />

        
        <Box sx={{ margin: 1, width: 220 }}>
          <Typography id="rating-slider-label" gutterBottom>
            Min Rating: {props.ratingFilter}
          </Typography>
          <Slider
            value={props.ratingFilter}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            step={0.5}
            marks
            min={0}
            max={10}
          />
        </Box>

        
        <Typography variant="h5" component="h1" sx={{ mt: 2 }}>
          <SortIcon fontSize="large" />
          Sort movies
        </Typography>
        <FormControl sx={{ margin: 1, minWidth: 220 }}>
          <InputLabel id="sort-select-label">Sort By</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={props.sortOption}
            onChange={(e) => handleTextChange(e, "sort")}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="rating-desc">Rating: High to Low</MenuItem>
            <MenuItem value="rating-asc">Rating: Low to High</MenuItem>
            <MenuItem value="date-desc">Release Date: New to Old</MenuItem>
            <MenuItem value="date-asc">Release Date: Old to New</MenuItem>
            <MenuItem value="title-asc">Title: A to Z</MenuItem>
            <MenuItem value="title-desc">Title: Z to A</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}