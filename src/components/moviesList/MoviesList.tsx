import React, { useEffect, useState } from 'react';
import { useMovies } from '../../context/Context';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/types';
import classes from "./moviesList.module.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import { textFieldStyles } from '../addNewMovie/AddNewMovie';

const MoviesList = () => {
    const { movies, fetchMovies } = useMovies();
    const [data, setData] = useState<Movie[]>([]); // Start empty

    useEffect(() => {
        fetchMovies(); // Fetch movies when component mounts
    }, []);

    useEffect(() => {
        setData(movies); // Update list when movies are fetched
    }, [movies]);

    const onTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filteredData = movies.filter(movie =>
            movie.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setData(filteredData);
    };

    return (
        <Box sx={{ width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' } }} className={classes.moviesListContainer}>
            <Typography variant='h4' align='center' className={classes.movieListTitle}>Movies List</Typography>
            
            <div className={classes.searchContainer}>
                <TextField
                    size='small'
                    sx={textFieldStyles}
                    className={classes.searchInput}
                    type="text"
                    onChange={onTyping}
                    margin="normal"
                    label="Search"
                    name="search"
                />
            </div>

            <div className={classes.moviesListContainerInner}>
                {data.length > 0 ? (
                    data.map(movie => (
                        <div className={classes.listItem} key={movie.id}>
                            <div className={classes.titleContainer}>
                                <Typography align='center'>{movie.title}</Typography>
                            </div>
                            <div className={classes.btnContainer}>
                                <Link to={`/movieInfo/${movie.id}`}>
                                    <Button sx={{ borderRadius: "0 0 5px 5px", width: "100%" }} size='small' variant='contained'>
                                        Info
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <Typography align="center" sx={{ marginTop: "1rem" }}>
                        No movies found...
                    </Typography>
                )}
            </div>

            <Link to="/addNewMovie">
                <Button size='small' sx={{ margin: "1rem" }} variant='contained'>Add New Movie</Button>
            </Link>
        </Box>
    );
};

export default MoviesList;
