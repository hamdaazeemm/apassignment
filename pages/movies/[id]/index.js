import { getMovieById, getAllMovies } from '../../../utils/data';

export async function getStaticPaths() {
  const paths = getAllMovies().map(movie => ({ params: { id: movie.id } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const movie = getMovieById(params.id);
  if (!movie) return { notFound: true };
  return { props: { movie }, revalidate: 30 };
}

export default function MovieDetails({ movie }) {
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Rating: {movie.rating}</p>
      <a href={`/movies/${movie.id}/director`}>View Director</a>
    </div>
  );
}
