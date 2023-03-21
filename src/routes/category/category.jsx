import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { categoriesSelector, selectCategoriesIsLoading } from '../../store/category/category.selector';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import { CategoryContainer, CategoryTitle } from './category.styles';

const Category = () => {
    const { category } = useParams();
    const categories = useSelector(categoriesSelector);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categories[category]);


    useEffect(() => {
        setProducts(categories[category])
    }, [category, categories])

    return (
        <Fragment>
            <CategoryTitle className="category-title">{category.toUpperCase()}</CategoryTitle>
            {isLoading ? <Spinner /> : (
            <CategoryContainer>
            {products 
                && products.map((product) => {
                return (
                    <ProductCard key={product.id} product={product}/>
                )
            })}
            </CategoryContainer>
            )}
        </Fragment>
    );
};

export default Category;