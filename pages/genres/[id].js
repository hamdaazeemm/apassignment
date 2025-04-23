import { getAllMovies, getAllGenres } from '../../utils/data';

export async function getStaticPaths() {
  const paths = getAllGenres().map(genre => ({ params: { id: genre.id } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const movies = getAllMovies().filter(m => m.genreId === params.id);
  return { props: { movies }, revalidate: 20 };
}

export default function GenreMovies({ movies }) {
  return (
    <div>
      <h2>Movies in this genre</h2>
      {movies.map(m => <div key={m.id}>{m.title}</div>)}
    </div>
  );
}
