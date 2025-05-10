// pages/movies/[id].js
import React from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from '@mui/material';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const baseUrl = context.req.headers.host.startsWith('localhost')
    ? 'http://' + context.req.headers.host
    : 'https://' + context.req.headers.host;

  try {
    const res = await fetch(`${baseUrl}/api/movies/${id}`);
    const data = await res.json();

    if (!data || data.error) return { notFound: true };

    return { props: data };
  } catch (error) {
    return { notFound: true };
  }
}

export default function MovieDetail({ movie, genre, director }) {
  const router = useRouter();

  if (router.isFallback || !movie) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
        <Typography>Loading movie...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" gutterBottom>{movie.title}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>{movie.description}</Typography>
          <Typography variant="subtitle2">🎭 Genre: {genre?.name || 'Unknown'}</Typography>
          <Typography variant="subtitle2">🎬 Year: {movie.releaseYear}</Typography>
          <Typography variant="subtitle2">⭐ Rating: {movie.rating}</Typography>

          {director && (
  <>
    <Typography variant="h6" sx={{ mt: 3 }}>🎬 Director</Typography>
    <Link href={`/directors/${director.id}`} passHref>
      <Button variant="text">{director.name}</Button>
    </Link>
    <Typography variant="body2" sx={{ mt: 1 }}>{director.biography}</Typography>
  </>
)}
        </CardContent>
        <CardActions>
          <Link href="/">
            <Button size="small" variant="outlined">← Back to Home</Button>
          </Link>
        </CardActions>
      </Card>
    </Container>
  );
}
