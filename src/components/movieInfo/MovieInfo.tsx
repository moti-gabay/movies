import React from 'react'
import { useMovies } from '../../context/Context';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { api_url_movies } from '../../url';
import { Link } from 'react-router-dom';
import classes from "./movieInfo.module.css"
import { Box, Button, Typography } from '@mui/material';

function MovieInfo() {
  const { movies, fetchMovies } = useMovies();
  const nav = useNavigate();
  const { id } = useParams();
  const movie = movies.find((movie) => movie.id === id);

  const deleteMovie = async () => {
    try {
      if (window.confirm(`האם אתה בטוח שברצונך למחוק את הסרט ${movie?.title}?`)) {
        const res = await axios.delete(`${api_url_movies}/${id}`);
        console.log(res);
        fetchMovies();
        nav("/");
      } else {
        fetchMovies();
        nav("/");
      }
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <Box sx={{  width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' },}} className={classes.movieInfoContainer}>
      {movie ? (
        <div>
          <Typography align='center' variant='h4'>{movie.title}</Typography>
          <Typography align='center' variant='h5'>{movie.description}</Typography>
          <Typography align='center'>{movie.year}</Typography>
        </div>
      ) : (
        <Typography align='center' variant='h5'>No movies found...</Typography>
      )}
      <div className={classes.btnContainer}>

        <Link to={`/EditMovie/${id}`}>
          <Button color="info" variant='contained' size='small'>Edit Movie</Button>
        </Link>
        <Button size='small' color='error' variant='contained' onClick={() => movie && deleteMovie()}>delete movie</Button>
        <Link to="/">
          <Button size='small' color='warning' variant='contained'>back</Button>
        </Link>
      </div>



    </Box>
  )
}
export default MovieInfo
