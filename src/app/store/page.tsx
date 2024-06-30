import React from 'react';
import ProductList from '@/app/components/ProductList/ProductList';
import Header from '@/app/components/Header/Header';

const Store: React.FC = () => {
  return (
    <div>
      <Header />
      <ProductList />
    </div>
  );
};

export default Store;
