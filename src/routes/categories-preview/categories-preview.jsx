import { useContext, Fragment } from 'react';
import { CategoryContext } from '../../contexts/category.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
    const {categories} = useContext(CategoryContext);

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