import React from 'react';
import products from '@/app/mock/mock';
import ProductCard from '@/app/components/ProductCard/ProductCard';
import styles from './ProductList.module.scss';

const ProductList: React.FC = () => {
  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
