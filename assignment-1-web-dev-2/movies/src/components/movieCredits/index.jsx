import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import imgPlaceholder from "../../images/film-poster-placeholder.png";

const MovieCredits = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) return <Spinner />;
  if (isError) return <Typography color="error">{error.message}</Typography>;

  const cast = data.cast.slice(0, 6);

  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
        Top Billed Cast
      </Typography>
      <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>
        {cast.map((actor) => (
          <Card key={actor.id} sx={{ minWidth: 140, maxWidth: 140 }}>
            <CardMedia
              component="img"
              height="175"
              image={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : imgPlaceholder
              }
              alt={actor.name}
            />
            <CardContent sx={{ p: 1 }}>
              <Typography variant="subtitle2" noWrap>
                {actor.name}
              </Typography>

              <Typography variant="caption" color="text.secondary" noWrap>
                {actor.character}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MovieCredits;