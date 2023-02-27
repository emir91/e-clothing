import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";


export const CategoryContext = createContext({
    categories: {},
})

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState({})

    useEffect(() => {
        const getDocs = async () => {
            const data = await getCategoriesAndDocuments();
            setCategories(data);
        }

        getDocs()
    }, [])
    const value = { categories }

    return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
}