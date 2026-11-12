import {useEffect, useState} from 'react';

export default function usePartnerConfig(path = '/api/partners/config') {
  const [config, setConfig] = useState({loading: true, available: false, loginAvailable: false});
  useEffect(() => {
    const controller = new AbortController();
    fetch(path, {signal: controller.signal, cache: 'no-store'})
      .then(response => {if (!response.ok) throw new Error(); return response.json();})
      .then(value => setConfig({...value, loading: false}))
      .catch(error => {if (error.name !== 'AbortError') setConfig({loading: false, available: false, loginAvailable: false});});
    return () => controller.abort();
  }, [path]);
  return config;
}
