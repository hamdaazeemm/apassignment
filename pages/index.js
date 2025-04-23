import { getAllMovies } from '../utils/data';
import { useRouter } from 'next/router';

export async function getStaticProps() {
  const movies = getAllMovies().slice(0, 3); // Simulated trending
  return { props: { movies }, revalidate: 10 };
}

export default function Home({ movies }) {
  const router = useRouter();

  return (
    <div>
      <h1>Trending Movies</h1>
      <ul>
        {movies.map(movie => <li key={movie.id}>{movie.title}</li>)}
      </ul>
      <button onClick={() => router.push('/genres')}>Browse Genres</button>
    </div>
  );
}
