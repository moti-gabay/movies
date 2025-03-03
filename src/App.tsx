import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom';
import MoviesList from './components/moviesList/MoviesList';
import MovieInfo from './components/movieInfo/MovieInfo';
import AddNewMovie from './components/addNewMovie/AddNewMovie';
import EditMovie from './components/editMovie/EditMovie';
import './App.css';
import Layout from './components/layout/Layout';

const App = () => {

  return (
    <>
      <Routes>
        <Route  path="/" element={<Layout />}>
         <Route index element={<MoviesList />} />
          <Route path="/moviesList" element={<MoviesList />} />
          <Route path="/addNewMovie" element={<AddNewMovie />} />
          <Route path="/EditMovie/:id" element={<EditMovie />} />
          <Route path="/movieInfo/:id" element={<MovieInfo />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
