import axios from "axios";
import { API_BASE_URL } from "./config";

export const addItem = async(item) => {
    return await axios.post(`${API_BASE_URL}/api/v1.0/admin/items`, item,
        {headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }}
    )
}

export const deleteItem = async(itemId) => {
    return await axios.delete(`${API_BASE_URL}/api/v1.0/admin/items/${itemId}`,
        {headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }}
    )
}

export const fetchItems = async () => {
    return await axios.get(`${API_BASE_URL}/api/v1.0/items`,
        {headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }}
    )
}
