
export const API_URL = import.meta.env.VITE_API_URL;

export const uploadFile = async (file, title, description, apiKey) => {
    const formData = new FormData();

    formData.append("FormFile", file);

    if (title !== "") formData.append("Title", title);
    if (description) formData.append("Description", description);

    const response = await fetch(`${API_URL}/media/upload`, {
        method: "POST",
        headers: {
            Authorization: apiKey
        },
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        const apiError = new Error(error.message);

        apiError.statusCode = response.status;
        throw apiError;
    }

    return response.json();
};


export const createToken = async (name, expiration) => {
    const response = await fetch(`${API_URL}/tokens/create-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            expiresAt: expiration || null,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        const apiError = new Error(error.message);

        apiError.statusCode = response.status;
        throw apiError;
    }

    return response.json();
};

export const findTokenInfo = async (token) => {
    const response = await fetch(`${API_URL}/tokens/info`, {
        method: "GET",
        headers: {
            Authorization: token ?? ""
        },
    });

    if (!response.ok) {
        const error = await response.json();
        const apiError = new Error(error.message);

        apiError.statusCode = response.status;
        throw apiError;
    }

    return response.json();
}

export const getHealthInfo = async () => {
    const response = await fetch(`${API_URL}/health`, {
        method: "GET",
    });

    if (!response.ok) {
        const error = await response.json();
        const apiError = new Error(error.message);

        apiError.statusCode = response.status;
        throw apiError;
    }

    return response.json();
}