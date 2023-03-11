import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { CategoryContext } from '../../contexts/category.context';

import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContainer, CategoryTitle } from './category.styles';

const Category = () => {
    const { category } = useParams();
    const { categories } = useContext(CategoryContext);
    const [products, setProducts] = useState(categories[category]);

    useEffect(() => {
        setProducts(categories[category])
    }, [category, categories])

    return (
        <Fragment>
            <CategoryTitle className="category-title">{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
            {products 
                && products.map((product) => {
                return (
                    <ProductCard key={product.id} product={product}/>
                )
            })}
            </CategoryContainer>
        </Fragment>
    );
};

export default Category;