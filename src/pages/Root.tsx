import { useAuth } from '@/hooks';
import { Button } from '@ui/button';

export const Root = () => {
  const { user, session, signOut } = useAuth();

  return (
    <div>
      <Button onClick={() => signOut()}>Signout</Button>
      <h1>User:</h1>
      <pre> {JSON.stringify(user, null, 4)}</pre>
      <h2>Session:</h2>
      <pre> {JSON.stringify(session, null, 4)}</pre>
    </div>
  );
};
