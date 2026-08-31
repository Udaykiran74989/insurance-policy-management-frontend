import { useCallback, useEffect, useState } from 'react';
import { friendlyError } from '@/api/client';

export function useApi<T>(request: () => Promise<T>, immediate = true) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState('');
  const run = useCallback(async () => { setLoading(true); setError(''); try { const result = await request(); setData(result); return result; } catch (err) { setError(friendlyError(err)); throw err; } finally { setLoading(false); } }, [request]);
  useEffect(() => { if (immediate) void run(); }, [immediate, run]);
  return { data, loading, error, run, setData };
}