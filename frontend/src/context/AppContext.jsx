import React, { useEffect, useState, createContext } from 'react'
import { fetchCategories } from '../service/CategoryService';
import { fetchItems } from '../service/ItemService';

export const AppContext = createContext(null);

const AppContextProvider = (props) => {

    const [itemsData,setItemsData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [auth,setAuth] = useState({
        "token" : null,
        "role" : null
    });

    useEffect(() => {
    async function loadData() {
        try {
            const response = await fetchCategories();
            const itemResponse = await fetchItems();
            setCategories(response?.data || []);
            setItemsData(itemResponse?.data||[]);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }
    loadData();
}, []);

    const setAuthData = (token,role) => {
        setAuth({token,role});
    }

    const contextValue = {
        categories,
        setCategories,
        auth,
        setAuthData,
        itemsData,
        setItemsData
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
