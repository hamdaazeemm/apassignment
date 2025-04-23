import { useRouter } from 'next/router';

export default function HelpPage() {
  const { slug } = useRouter().query;

  return (
    <div>
      <h1>Help Page</h1>
      <p>Path: {slug?.join('/')}</p>
    </div>
  );
}
