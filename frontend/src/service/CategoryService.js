import axios from "axios";
import { API_BASE_URL } from "./config";

export const addCategory = async (category) => {
    return await axios.post(`${API_BASE_URL}/api/v1.0/categories`, category,
        {headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }}
    );
}

export const deleteCategory = async (categoryId) => {
    return await axios.delete(`${API_BASE_URL}/api/v1.0/categories/${categoryId}`,
        {headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }}
    );
}

export const fetchCategories = async () => {
    return axios.get(
        `${API_BASE_URL}/api/v1.0/categories`,
        {headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
        }}
    );
};