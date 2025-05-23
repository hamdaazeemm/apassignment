import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const baseUrl = context.req.headers.host.startsWith('localhost')
    ? 'http://' + context.req.headers.host
    : 'https://' + context.req.headers.host;

  const [resMovies, resGenres] = await Promise.all([
    fetch(`${baseUrl}/api/genres/${id}/movies`),
    fetch(`${baseUrl}/api/genres`)
  ]);

  const movies = await resMovies.json();
  const genres = await resGenres.json();
  const genre = genres.find((g) => g.id === id) || { name: 'Unknown Genre' };

  return { props: { movies, genre } };
}

export default function GenreDetailPage({ genre, movies }) {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>🎭 {genre.name}</Typography>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2">{movie.releaseYear}</Typography>
                <Link href={`/movies/${movie._id}`} passHref>
                  <Button size="small" sx={{ mt: 1 }}>View Movie</Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Link href="/" passHref>
        <Button sx={{ mt: 4 }} variant="outlined">← Back to Home</Button>
      </Link>
    </Container>
  );
}
