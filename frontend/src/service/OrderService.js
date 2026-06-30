import axios from "axios";
import { API_BASE_URL } from "./config";

export const createOrder = async (orderData) => {
    return await axios.post(`${API_BASE_URL}/api/v1.0/orders`, orderData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const fetchOrders = async () => {
    return await axios.get(`${API_BASE_URL}/api/v1.0/orders`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};
