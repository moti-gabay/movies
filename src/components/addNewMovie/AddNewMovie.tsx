import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api_url_movies } from '../../url';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import classes from "./addNewMovie.module.css"
import { Box, Button, TextField, Typography } from '@mui/material';
export const textFieldStyles = {
    '& .MuiInputBase-input': { color: 'white' }, // Text color
    '& .MuiInputLabel-root': { color: 'white' }, // Label color
    '& .MuiInputLabel-root.Mui-focused': { color: 'yellowgreen' }, // Focused label
    '& .MuiInputLabel-root.Mui-error': { color: 'red' }, // Error label
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'white' }, // Default border
        '&:hover fieldset': { borderColor: 'green' }, // Hover border
        '&.Mui-focused fieldset': { borderColor: 'yellowgreen' }, // Focused border
    },
};
const AddNewMovie = () => {

    const nav = useNavigate();
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            year: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("title is required"),
            description: Yup.string().required("description is required"),
            year: Yup.number().required("year is required"),
        }),
        onSubmit: (values) => {
            addNewMovie(values);
            formik.resetForm();
        },
    });
    const addNewMovie = async (movie: any) => {
        try {
            await axios.post(api_url_movies, { ...movie, id: Date.now().toString() });
            nav("/");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Box sx={{ width: { xs: '100%', sm: '80%', md: '60%', lg: '40%' }, }} className={classes.addNewMovieContainer}>
            <Typography align='center' variant="h5" gutterBottom>
                Add New Movie</Typography>
            <form style={{ color: "white" }} onSubmit={formik.handleSubmit} action="">
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
                    <Button color="info" variant='contained' type='submit' >add</Button>
                    <Link to="/">
                        <Button color='warning' variant='contained'>back</Button>
                    </Link>
                </div>
            </form>
        </Box>
    )
}

export default AddNewMovie
