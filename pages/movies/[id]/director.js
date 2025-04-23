import { getMovieById, getDirectorById } from '../../../utils/data';

export async function getStaticPaths() {
  const paths = getAllMovies().map(movie => ({ params: { id: movie.id } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const movie = getMovieById(params.id);
  if (!movie) return { notFound: true };
  const director = getDirectorById(movie.directorId);
  return { props: { director }, revalidate: 30 };
}

export default function Director({ director }) {
  return (
    <div>
      <h1>{director.name}</h1>
      <p>{director.biography}</p>
    </div>
  );
}
