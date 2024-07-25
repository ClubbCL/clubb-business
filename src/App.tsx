import './App.css';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import clubbLogo from './assets/clubb.png';

function App() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center justify-center">
        <a href="https://react.dev" target="_blank">
          <img src={clubbLogo} alt="Clubb Logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>{t('hello_world')}</h2>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
