const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL; 


// config header for authenticated routes (with credentials)
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

// config header for public routes (without credentials) - for topic endpoints
export const configHeaderPublic = (method: string, urlPath: string, data?: any) => {
    const config = {
        method: method,
        url: `${VITE_SERVER_URL}${urlPath}`,
        headers: {"Content-type": "application/json; charset=UTF-8"},
        data: JSON.stringify(data),
        withCredentials: false
    }
    return config
}