import axios from "axios";
import type { Movie } from "../types/movie";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common.Authorization = `Bearer ${
  import.meta.env.VITE_TMDB_TOKEN
}`;
axios.defaults.headers.common.Accept = "application/json";

interface FetchMoviesResponse {
  results: Movie[];
}

export async function fetchMovies(name: string): Promise<Movie[]> {
  const response = await axios.get<FetchMoviesResponse>("/search/movie", {
    params: {
      query: name,
    },
  });

  return response.data.results;
}
