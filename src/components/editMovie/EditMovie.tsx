import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { api_url_movies } from '../../url';
import { Movie } from '../../types/types';
import { useMovies } from '../../context/Context';
import { Link } from 'react-router-dom';
import classes from "./editMovie.module.css";
import { Box, Button, TextField, Typography } from '@mui/material';
import { textFieldStyles } from '../addNewMovie/AddNewMovie';

const EditMovie = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const { fetchMovies } = useMovies();
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            year: 0,
        },
        validationSchema: Yup.object({
            title: Yup.string().required("title is required"),
            description: Yup.string().required("description is required"),
            year: Yup.number().required("year is required"),
        }),
        onSubmit: (values) => {
            editMovie(values);
            formik.resetForm();
        },
    });

    const editMovie = async (movie: Movie) => {
        try {
            const res = await axios.put(api_url_movies + "/" + id, { ...movie, id: Date.now().toString() });
            fetchMovies();
            nav("/")
        } catch (error) {
            console.log(error);
        }
    }
    const getMovieById = async () => {
        const res = await axios.get(`${api_url_movies}/${id?.toString()}`);
        formik.setValues(res.data);
    }
    useEffect(() => {
        getMovieById();
    }, []);
    return (
        <Box className={classes.editMovieContainer} sx={{ width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' }, }}>
            <Typography align='center' variant='h4'>Edit Movie</Typography>
            <form onSubmit={formik.handleSubmit} action="">
                <TextField
                    size='small'
                    sx={textFieldStyles}
                    fullWidth
                    margin="normal"
                    label="Title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                    size='small'
                    fullWidth
                    sx={textFieldStyles}
                    margin="normal"
                    label="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <TextField

                    size='small'
                    fullWidth
                    sx={textFieldStyles}
                    margin="normal"
                    label="Year"
                    name="year"
                    value={formik.values.year}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.year && Boolean(formik.errors.year)}
                    helperText={formik.touched.year && formik.errors.year}
                />
                <div className={classes.buttonsContainer}>
                    <Button color="info" variant='contained' type='submit' >Edit</Button>
                    <Link to="/">
                        <Button color='warning' variant='contained'>back</Button>
                    </Link>
                </div>
            </form>

        </Box>
    )
}

export default EditMovie
