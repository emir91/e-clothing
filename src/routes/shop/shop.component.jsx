import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useDispatch } from 'react-redux';

//import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
//import { setCategories } from "../../store/category/category.action";
import { fetchCategoriesStart } from '../../store/category/category.action';

import CategoriesPreview from '../categories-preview/categories-preview';
import Category from '../category/category';
import './shop.styles.scss';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesStart());
    }, [dispatch])
    
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path='/:category' element={<Category />} />
        </Routes>
    )

   

}

export default Shop;