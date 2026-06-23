import React, { useEffect, useState, createContext } from 'react';
import { fetchCategories } from '../service/CategoryService';
import { fetchItems } from '../service/ItemService';

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    const token = localStorage.getItem('token');
    const hasToken = token && token !== "null" && token !== "undefined";
    if (!hasToken) return;

    setLoading(true);
    try {
      const catResponse = await fetchCategories();
      setCategories(catResponse.data || []);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }

    try {
      const itemsResponse = await fetchItems();
      setItemsData(itemsResponse.data || []);
    } catch (error) {
      console.error("Failed to load items:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const contextValue = {
    categories,
    setCategories,
    itemsData,
    setItemsData,
    loadData,
    loading
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
