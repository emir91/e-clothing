import React from 'react';
import ProductCard from '../product-card/product-card.component';

import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles';
import { CategoryItem } from '../../store/category/category.types';

type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
};

const CategoryPreview: React.FC<CategoryPreviewProps> = ({title, products}) => {

    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title} className="title">{title}</Title>
            </h2>
            <Preview>
                {products
                    .filter((_, index) => index < 4)
                    .map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        )
                    })
                }
            </Preview>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;