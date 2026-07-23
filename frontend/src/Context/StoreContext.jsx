import { createContext, useEffect, useState } from "react";
import { food_list as static_food_list, menu_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000"
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("")
    const currency = "¥";
    const deliveryCharge = 50;

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        //data only sent to backend if logged in else just fe updation.
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            try {
              if (cartItems[item] > 0) { //food_list mounted due to the exec of useEffect once app mounts.
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }  
            } catch (error) {
                
            }
            
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
        setCartItems(response.data.cartData);
    }

    const cleanupIncompleteOrders = async () => {
        if (token) {
            try {
                await axios.post(url + "/api/order/cleanup", {}, { headers: { token } });
            } catch (error) {
                console.log("Cleanup error:", error);
            }
        }
    }

    //  UseEffect runs once when your app (or this provider) mounts, and fetches the food list from dB, wrapping in main.jsx.
    useEffect(() => {
        async function loadData() {
            await fetchFoodList(); // to load when main.jsx initiates.
            if (localStorage.getItem("token")) { //still logged in after refresh.
                setToken(localStorage.getItem("token"))
                await loadCartData({ token: localStorage.getItem("token") })
            }
        }
        loadData()
    }, [])

    // Cleanup incomplete orders when token changes (user logs in)
    useEffect(() => {
        if (token) {
            cleanupIncompleteOrders();
        }
    }, [token])

    const contextValue = {
        url,
        food_list,
        menu_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        currency,
        deliveryCharge,
        cleanupIncompleteOrders
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider;