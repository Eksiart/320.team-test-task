export async function req<T>(url: string, config: RequestInit = {}): Promise<T> {
	return fetch(url, {...config, credentials: 'include'})
		.then(response => response.json())
		.then(data => data as T)
}