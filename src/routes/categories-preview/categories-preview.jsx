import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { categoriesSelector } from '../../store/category/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
    const categories = useSelector(categoriesSelector)

    return (
        <Fragment>
            {
                Object.keys(categories).map((key) => {
                    const products = categories[key]
                    return (
                        <CategoryPreview key={key} title={key} products={products}/>
                    );
                })
            }
        </Fragment>
    )
};

export default CategoriesPreview;