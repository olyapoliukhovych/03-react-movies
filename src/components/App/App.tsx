import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import MovieGrid from "../MovieGrid/MovieGrid";
import { useState } from "react";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);

      const getResult = await fetchMovies(query);

      if (getResult.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(getResult);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {movies.length > 0 && !isLoading && !isError && (
        <MovieGrid movies={movies} onSelect={setCurrentMovie} />
      )}

      {currentMovie && (
        <MovieModal
          movie={currentMovie}
          onClose={() => setCurrentMovie(null)}
        />
      )}
    </>
  );
}
