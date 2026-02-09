const API_URL = 'http://localhost:5000/api';

export const bikeService = {
    // Get all bikes
    async getBikes() {
        try {
            const response = await fetch(`${API_URL}/bikes`);
            if (!response.ok) throw new Error('Failed to fetch bikes');
            return await response.json();
        } catch (error) {
            console.error('Error in getBikes:', error);
            return [];
        }
    },

    // Get a specific bike by slug
    async getBikeBySlug(slug) {
        try {
            const response = await fetch(`${API_URL}/bikes/${slug}`);
            if (!response.ok) return null;
            return await response.json();
        } catch (error) {
            console.error('Error in getBikeBySlug:', error);
            return null;
        }
    },

    // Update or Create a bike
    async saveBike(bike) {
        try {
            const response = await fetch(`${API_URL}/bikes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bike)
            });
            if (!response.ok) throw new Error('Failed to save bike');
            return await response.json();
        } catch (error) {
            console.error('Error in saveBike:', error);
            throw error;
        }
    },

    // Delete a bike
    async deleteBike(id) {
        try {
            const response = await fetch(`${API_URL}/bikes/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete bike');
        } catch (error) {
            console.error('Error in deleteBike:', error);
            throw error;
        }
    },

    // Physical Image Upload to server
    async uploadImage(file, path) {
        try {
            const formData = new FormData();
            formData.append('image', file);
            // path argument is ignored
            const response = await fetch(`${API_URL}/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Image upload failed');
            const data = await response.json();
            return data.url; // Returns the public URL (e.g., /uploads/filename.jpg)
        } catch (error) {
            console.error('Error in uploadImage:', error);
            throw error;
        }
    },

    // Helper to convert Base64 to Blob (still useful for some legacy logic)
    dataURLtoFile(dataurl, filename) {
        try {
            let arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }

            return new File([u8arr], filename, { type: mime });
        } catch (e) {
            console.error('Failed to convert base64 to file:', e);
            return null;
        }
    }
};
