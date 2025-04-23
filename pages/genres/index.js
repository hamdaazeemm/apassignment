import { getAllGenres, getAllMovies } from '../../utils/data';

export async function getServerSideProps() {
  return { props: { genres: getAllGenres(), movies: getAllMovies() } };
}

export default function Genres({ genres }) {
  return (
    <div>
      <h1>Genres</h1>
      <ul>
        {genres.map(genre => (
          <li key={genre.id}>
            <a href={`/genres/${genre.id}`}>{genre.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
