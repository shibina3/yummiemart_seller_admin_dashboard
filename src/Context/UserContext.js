import React, { createContext, useState, useMemo } from "react";

export const UserContext = createContext({
    userType: null,
    setUserType: () => {},
    categories: [],
    setCategories: () => {},
    stores: [],
    setStores: () => {}
});


export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  //const [userDetails, setUserDetails] = useState({}); 

  const value = useMemo(
    () => ({
      userType,
      setUserType,
        categories,
        setCategories,
        stores,
        setStores
    }),
    [userType,categories, stores]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
