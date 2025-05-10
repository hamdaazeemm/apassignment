import React from 'react';
import { Container, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const baseUrl = context.req.headers.host.startsWith('localhost')
    ? 'http://' + context.req.headers.host
    : 'https://' + context.req.headers.host;

  const res = await fetch(`${baseUrl}/api/genres`);
  const genres = await res.json();

  return { props: { genres } };
}

export default function GenresPage({ genres }) {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>📚 Browse Genres</Typography>
      <Grid container spacing={3}>
        {genres.map((genre) => (
          <Grid item xs={12} sm={6} md={4} key={genre.id}>
            <Link href={`/genres/${genre.id}`} passHref>
              <Card variant="outlined">
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6">{genre.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
