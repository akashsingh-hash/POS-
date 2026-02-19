import React, { useEffect, useState, createContext } from 'react'
import { fetchCategories } from '../service/CategoryService';

export const AppContext = createContext(null);

const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function loadData() {
            const response = await fetchCategories();
            setCategories(response.data);
        }
        loadData();
    }, []);

    const contextValue = {
        categories,
        setCategories
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
