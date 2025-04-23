


// import { getAllMovies, getAllGenres } from '../../utils/data';

// export async function getStaticPaths() {
//   const paths = getAllGenres().map(genre => ({ params: { id: genre.id } }));
//   return { paths, fallback: 'blocking' };
// }

// export async function getStaticProps({ params }) {
//   const movies = getAllMovies().filter(m => m.genreId === params.id);
//   return { props: { movies }, revalidate: 20 };
// }

// export default function GenreMovies({ movies }) {
//   return (
//     <div>
//       <h2>Movies in this genre</h2>
//       {movies.map(m => <div key={m.id}>{m.title}</div>)}
//     </div>
//   );
// }


import Link from 'next/link';
import { getAllMovies, getAllGenres } from '../../utils/data';

export async function getStaticPaths() {
  const genres = getAllGenres();
  const paths = genres.map(genre => ({
    params: { id: genre.id }
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const genreId = params.id;
  const allMovies = getAllMovies();
  const genreMovies = allMovies.filter(m => m.genreId === genreId);
  return {
    props: { movies: genreMovies },
    revalidate: 20,
  };
}

export default function GenreMovies({ movies }) {
  return (
    <div>
      <h1>Movies in this Genre</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.id}`}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

