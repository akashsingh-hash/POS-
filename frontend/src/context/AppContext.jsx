import React, { useEffect, useState, createContext } from 'react'
import { fetchCategories } from '../service/CategoryService';
import { fetchItems } from '../service/ItemService';

export const AppContext = createContext(null);

const AppContextProvider = (props) => {

    const [cartItems,setCartItems] = useState([]);

    const [itemsData,setItemsData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [auth,setAuth] = useState({
        "token" : null,
        "role" : null
    });

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
        if(existingItem){
            setCartItems(
                cartItems.map(cartItem => cartItem.name === item.name ? {
                    ...cartItem, quantity: cartItem.quantity+1
                } : cartItem
            )
            )
        }
        else{
            setCartItems([...cartItems,{...item,quantity:1}]);
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.itemId !== itemId));
    }

    const updateQuantity = (itemId,newQuantity) => {
        setCartItems(cartItems.map(item => item.itemId === itemId ? {...item,quantity:newQuantity}:item))
    }

    useEffect(() => {
    async function loadData() {
        try {
            if(localStorage.getItem("token") && localStorage.getItem("role")){
                setAuthData(
                    localStorage.getItem("token"),
                    localStorage.getItem("role")
                )
            }
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
        setItemsData,
        addToCart,
        cartItems,
        removeFromCart,
        updateQuantity
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
