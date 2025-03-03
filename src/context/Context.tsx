import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { Movie } from '../types/types';
import {  api_url_movies } from '../url';

// Define the shape of a movie


// Define the context type
type MovieContextType = {
  movies: Movie[];
  fetchMovies: () => Promise<void>;
}

// Create the context
const MovieContext = createContext<MovieContextType | undefined>(undefined);

// Create the provider component
export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  // Function to fetch movies from the API
  const fetchMovies = async () => {
    try {

      const {data} = await axios.get(api_url_movies);
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Fetch movies on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider value={{ movies, fetchMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook to use the context
export const useMovies = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};
