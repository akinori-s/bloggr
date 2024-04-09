import { useState, useEffect } from 'react';

var BASE_URL: string = 'http://localhost:8080/api';

interface FetchOptions<T> {
	body?: T;
	headers?: HeadersInit;
}

interface FetchResult<T> {
	data: T | null;
	error: string | null;
	loading: boolean;
}

function useFetch<T, U = undefined>(
	url: string,
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
	options?: FetchOptions<U>
): FetchResult<T> {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	url = BASE_URL.concat(url, '/');
	console.log(url);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const requestOptions: RequestInit = {
					method: method,
					headers: {
						'Content-Type': 'application/json',
						...options?.headers
					},
					body: options?.body ? JSON.stringify(options.body) : null,
					credentials: 'include'
				};
				const response = await fetch(url, requestOptions);
				if (!response.ok) {
					throw new Error(`An error occurred: ${response.statusText}`);
				}
				const jsonData: T = await response.json();
				setData(jsonData);
				// console.log(jsonData);
			} catch (error) {
				setError(error instanceof Error ? error.message : 'An unknown error occurred');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	// Ensure the effect is re-run if url or options change
	}, [url, JSON.stringify(options)]);

	return { data, error, loading };
}

export default useFetch;	
