
import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
} from '@mui/material';
import Link from 'next/link';

export async function getServerSideProps(context) {
  // Get correct base URL (works in dev and production)
  const { req } = context;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  try {
    const res = await fetch(`${baseUrl}/api/movies`);
    const movies = await res.json();

    return {
      props: { movies },
    };
  } catch (error) {
    console.error('Failed to load movies:', error);
    return { props: { movies: [] } };
  }
}

export default function HomePage({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">No movies found.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        🎬 Movie House
      </Typography>

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie._id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">{movie.title}</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {movie.description}
                </Typography>
                <Typography variant="caption">
                  Release Year: {movie.releaseYear}
                </Typography>
                <br />
                <Typography variant="caption">Rating: {movie.rating}</Typography>
              </CardContent>
              <CardActions>
                <Link href={`/movies/${movie._id}`} passHref>
                  <Button size="small">View Details</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        sx={{ mt: 4 }}
        href="/genres"
      >
        Browse Genres
      </Button>
    </Container>
  );
}
