import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext';
import AdminDashboard from './AdminDashboard';

export default function Home() {
    const { userType, setUserType, setCategories, setStores } = useContext(UserContext);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(
                    `https://akk31sm8ig.execute-api.us-east-1.amazonaws.com/default`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ mobile: localStorage.getItem("mobile"), path: "/get/user-type" }),
                    }
                );
                const {body} = await response.json();
                localStorage.setItem("userName", body.name);
                setUserType(body.user_type);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchDetails();
    }, []); 

                  // get all stores from the server
                  const getAllStores = async () => {
                    try {
                      const response = await fetch("https://akk31sm8ig.execute-api.us-east-1.amazonaws.com/default", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ path: "/get/stores" }),
                      });
                      const {body} = await response.json();
                      setStores(body);
                    } catch (error) {
                      console.error("Error fetching stores: ", error);
                    }
                  };
    
    const fetchCategories = async () => {
        try {
            const response = await fetch("https://akk31sm8ig.execute-api.us-east-1.amazonaws.com/default", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ path: "/get/categories" }),
            });
            const {body} = await response.json();
            setCategories(body);
        } catch (error) {
            console.error("Error: ", error);
        }
    };
    
    useEffect(() => {
        if (userType !== null) {
            fetchCategories();
            getAllStores();
        }
    }, [userType]); 
    

  return (
<AdminDashboard userType={userType} fetchCategories={fetchCategories} /> 
  )
    
}
