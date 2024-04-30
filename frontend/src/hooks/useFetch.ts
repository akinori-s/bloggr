import { useState, useEffect, useCallback } from 'react';
import { StatusError } from '../types/apiTypes';

const BASE_URL: string = 'http://localhost:8080/api';

interface FetchOptions<T> {
	body?: T;
	headers?: HeadersInit;
}

interface FetchResult<T> {
	data: T | null;
	error: StatusError | null;
	loading: boolean;
	fetchData: () => void;
}

function useFetch<T, U = undefined>(
	url: string,
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
	options?: FetchOptions<U>
): FetchResult<T> {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<StatusError | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	url = BASE_URL.concat(url, '/');
	console.log(url);

	const fetchData = useCallback(() => {
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
					const error = new StatusError(`${response.statusText}`);
					error.status = response.status;
					throw error;
				}
				const jsonData: T = await response.json();
				setData(jsonData);
			} catch (error : any | Error) {
				if (!(error instanceof StatusError)) {
					error.message = 'An unknown error occurred';
				}
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	// Ensure the effect is re-run if url or options change
	}, [url, JSON.stringify(options)]);

	useEffect(() => {
		fetchData();
	}, []);

	return { data, error, loading, fetchData };
}

export default useFetch;
