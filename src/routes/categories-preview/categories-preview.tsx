import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { categoriesSelector, selectCategoriesIsLoading } from '../../store/category/category.selector';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

const CategoriesPreview = () => {
    const categories = useSelector(categoriesSelector);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <Fragment>
            {isLoading ? <Spinner/> : (
                Object.keys(categories).map((key) => {
                    const products = categories[key]
                    return (
                        <CategoryPreview key={key} title={key} products={products}/>
                    );
                })
            )}
        </Fragment>
    )
};

export default CategoriesPreview;