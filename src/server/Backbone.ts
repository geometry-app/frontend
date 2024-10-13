const { NODE_ENV } = process.env;

const GEOMETRY_BASE_URL = NODE_ENV === "development" ? "http://localhost:9090/api" : "https://geometrydash.ru/api";
console.info(`backbone base url: ${GEOMETRY_BASE_URL}`);
if (!GEOMETRY_BASE_URL)
    throw new Error("base url 'GEOMETRY_BASE_URL' is not set");

async function get<T>(url: string, headers?: any): Promise<T | undefined> {
    const response = await fetch(`${GEOMETRY_BASE_URL}/${url}`, {
        headers: {
            ...headers
        }
    });
    if (response.status == 204)
        return undefined;
    if (!response.ok)
        throw new Error(response.statusText);
    return await response.json() as T;
}

async function post<T, TData>(url: string, data: TData, headers?: any): Promise<T> {
    const response = await fetch(`${GEOMETRY_BASE_URL}/${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    });
    if (!response.ok)
        throw new Error(response.statusText);
    return await response.json() as T;
}

export {
    get,
    post
}
