import { useContext } from 'react';
import { ProductContext } from '../../contexts/product.context';


const Shop = () => {
    const {products} = useContext(ProductContext)

;
    return (
        <div>
            {products.map(({ name, id }) => {
                return (
                    <h1 key={id}>{name}</h1>  
                )
            })}            
        </div>
    );
};

export default Shop;