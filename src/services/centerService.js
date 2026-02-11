const API_URL = '/api';

export const centerService = {
    // Get all centers
    async getCenters() {
        try {
            const response = await fetch(`${API_URL}/centers`);
            if (!response.ok) throw new Error('Failed to fetch centers');
            return await response.json();
        } catch (error) {
            console.error('Error in getCenters:', error);
            return [];
        }
    },

    // Update or Create a center
    async saveCenter(center) {
        try {
            const response = await fetch(`${API_URL}/centers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(center)
            });
            if (!response.ok) throw new Error('Failed to save center');
            return await response.json();
        } catch (error) {
            console.error('Error in saveCenter:', error);
            throw error;
        }
    },

    // Delete a center
    async deleteCenter(id) {
        try {
            const response = await fetch(`${API_URL}/centers/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete center');
        } catch (error) {
            console.error('Error in deleteCenter:', error);
            throw error;
        }
    },

    // Upload Image
    async uploadImage(file) {
        try {
            const formData = new FormData();
            formData.append('image', file);
            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Image upload failed');
            const data = await response.json();
            return data.url;
        } catch (error) {
            console.error('Error in uploadImage:', error);
            throw error;
        }
    }
};
