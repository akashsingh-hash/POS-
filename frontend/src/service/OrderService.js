import axios from "axios";

export const createOrder = async (orderData) => {
    return await axios.post("http://localhost:8080/api/v1.0/orders", orderData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const fetchOrders = async () => {
    return await axios.get("http://localhost:8080/api/v1.0/orders", {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
};
