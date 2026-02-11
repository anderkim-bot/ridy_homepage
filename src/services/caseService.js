const API_URL = '/api';

export const caseService = {
    getAllCases: async () => {
        const response = await fetch(`${API_URL}/cases`);
        return response.json();
    },

    saveCase: async (caseData) => {
        const response = await fetch(`${API_URL}/cases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(caseData),
        });
        return response.json();
    },

    deleteCase: async (id) => {
        await fetch(`${API_URL}/cases/${id}`, {
            method: 'DELETE',
        });
    },

    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData,
        });
        return response.json();
    }
};
