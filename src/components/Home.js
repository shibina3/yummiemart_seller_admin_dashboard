import React, { useEffect, useState } from 'react'
import SellerDashboard from './SellerDashboard';
import AdminDashboard from './AdminDashboard';

export default function Home() {
    const [userType, setUserType] = useState("seller");

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
                        body: JSON.stringify({mobile: localStorage.getItem("mobile")})
                    }
                );
                const data = await response.json();
                console.log(data);
                setUserType(data.user_type);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchDetails();
    }, []);

  return userType === "seller" ? <SellerDashboard /> : 
    userType === "admin" ? <AdminDashboard /> :
    null;
}
