import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function Directors() {
  const { data, error } = useSWR('/api/directors', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Directors</h1>
      {data.map(d => (
        <div key={d.id}>
          <h3>{d.name}</h3>
          <p>{d.biography}</p>
        </div>
      ))}
    </div>
  );
}
