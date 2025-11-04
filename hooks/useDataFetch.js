import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching JSON data
 * @param {string} url - The URL to fetch from
 * @returns {Object} { data, loading, error }
 */
export function useDataFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
        const jsonData = await response.json();
        if (isMounted) {
          setData(jsonData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

