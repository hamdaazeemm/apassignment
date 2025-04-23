import { getAllMovies } from '../../utils/data';

export async function getStaticProps() {
  const movies = getAllMovies();
  return { props: { movies }, revalidate: 10 };
}

export default function Movies({ movies }) {
  return (
    <div>
      <h1>All Movies</h1>
      {movies.map(movie => (
        <div key={movie.id}>
          <a href={`/movies/${movie.id}`}>{movie.title}</a>
        </div>
      ))}
    </div>
  );
}
