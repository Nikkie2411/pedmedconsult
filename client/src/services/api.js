const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
    async makeRequest(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Patient related APIs
    async getPatients(department = null) {
        const queryParam = department ? `?department=${department}` : '';
        return this.makeRequest(`/patients${queryParam}`);
    }

    async getPatient(id) {
        return this.makeRequest(`/patients/${id}`);
    }

    // Request related APIs
    async createRequest(requestData) {
        return this.makeRequest('/requests', {
            method: 'POST',
            body: JSON.stringify(requestData),
        });
    }

    async getRequests(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const queryString = queryParams ? `?${queryParams}` : '';
        return this.makeRequest(`/requests${queryString}`);
    }

    async updateRequestResponse(id, response, pharmacistName) {
        return this.makeRequest(`/requests/${id}/response`, {
            method: 'PUT',
            body: JSON.stringify({ response, pharmacistName }),
        });
    }

    // Auth related APIs
    async verifyUser(email) {
        return this.makeRequest('/auth/verify', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    }

    async getDepartments() {
        return this.makeRequest('/auth/departments');
    }

    async getTdmDrugs() {
        return this.makeRequest('/auth/tdm-drugs');
    }

    // Health check
    async healthCheck() {
        return this.makeRequest('/health');
    }
}

const apiService = new ApiService();

export default apiService;
