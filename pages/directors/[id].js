import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button
} from '@mui/material';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const baseUrl = context.req.headers.host.startsWith('localhost')
    ? 'http://' + context.req.headers.host
    : 'https://' + context.req.headers.host;

  try {
    const res = await fetch(`${baseUrl}/api/directors/${id}`);
    const data = await res.json();

    if (!data || data.error) return { notFound: true };

    return { props: data };
  } catch (err) {
    return { notFound: true };
  }
}

export default function DirectorPage({ director, movies }) {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{director.name}</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>{director.biography}</Typography>

      <Typography variant="h5" sx={{ mb: 2 }}>🎥 Movies Directed:</Typography>

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
