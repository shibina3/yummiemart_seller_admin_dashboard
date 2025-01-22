import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/UserContext';
import AdminDashboard from './AdminDashboard';

export default function Home() {
    const { userType, setUserType, setCategories, setStores } = useContext(UserContext);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(
                    `http://localhost:4000/get/user-type`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ mobile: localStorage.getItem("mobile") }),
                    }
                );
                const data = await response.json();
                setUserType(data.user_type);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchDetails();
    }, []); 

                  // get all stores from the server
                  const getAllStores = async () => {
                    try {
                      const response = await fetch("http://localhost:4000/get/stores", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      });
                      const data = await response.json();
                      setStores(data);
                    } catch (error) {
                      console.error("Error fetching stores: ", error);
                    }
                  };
    
    const fetchCategories = async () => {
        try {
            const response = await fetch("http://localhost:4000/get/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setCategories(data);
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
<AdminDashboard userType={userType} fetchCategories={fetchCategories}/> 
  )
    
}
