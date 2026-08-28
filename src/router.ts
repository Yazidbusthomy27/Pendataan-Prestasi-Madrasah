import { useEffect, useState } from 'react';

export function useNavigate() {
  return (path: string) => {
    window.location.hash = path;
  };
}

export function useCurrentPath() {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const onHashChange = () => {
      setPath(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return path;
}
