const { NODE_ENV } = process.env;
const GEOMETRY_BASE_URL = NODE_ENV === "development" ? "http://localhost:8080/api" : "https://geometrydash.ru/api";
console.info(`backbone base url: ${GEOMETRY_BASE_URL}`);
if (!GEOMETRY_BASE_URL)
    throw new Error("base url 'GEOMETRY_BASE_URL' is not set");

function get<T>(url: string, headers?: any): Promise<T | null> {
    return fetch(`${GEOMETRY_BASE_URL}/${url}`, {
        headers: {
            ...headers
        }
    })
        .then(response => {
            if (response.status == 204)
                return null;
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json().then(x => x as T);
        });
}

function post<T, TData>(url: string, data: TData, headers?: any): Promise<T> {
    return fetch(`${GEOMETRY_BASE_URL}/${url}`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json', ...headers } })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json().then(x => {
                return x as T;
            });
        });
}

export {
    get,
    post
}