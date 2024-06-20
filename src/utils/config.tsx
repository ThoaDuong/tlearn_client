const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL; 


// config header
export const configHeader = (method: string, urlPath: string, data?: any) => {
    const config = {
        method: method,
        url: `${VITE_SERVER_URL}${urlPath}`,
        headers: {"Content-type": "application/json; charset=UTF-8"},
        data: JSON.stringify(data),
        withCredentials: true
    }
    return config
}