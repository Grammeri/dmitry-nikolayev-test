'use client';

import React, { useState } from 'react';
import styles from './ProductCard.module.scss';
import { FaHeart, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { ProductCardProps } from '@/app/interfaces/products';
import Image from 'next/image';

const ProductCard = ({ product }: ProductCardProps): React.ReactNode => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Image
          src={product.photo}
          alt={product.description}
          className={styles.productPhoto}
          width={500}
          height={500}
        />
        <span className={styles.discountLabel}>-14%</span>
        <button className={styles.quickViewButton}>Quick View</button>
      </div>
      <div className={styles.priceContainer}>
        <span className={styles.discountedPrice}>
          ${product.discountedPrice.toFixed(2)}
        </span>
        <span className={styles.initialPrice}>
          ${product.initialPrice.toFixed(2)}
        </span>
      </div>
      <p className={styles.description}>{product.description}</p>
      <div className={styles.rating}>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={handleMouseLeave}
            className={styles.star}
          >
            {hoveredRating >= index + 1 || product.rating >= index + 1 ? (
              <FaStar color="#FFD700" />
            ) : product.rating >= index + 0.5 ? (
              <FaStarHalfAlt color="#FFD700" />
            ) : (
              <FaStar color="#e4e5e9" />
            )}
          </span>
        ))}
        <span className={styles.votes}>({product.votes} votes)</span>
      </div>
      <div className={styles.installment}>
        Installment: {product.installment}
      </div>
      <div className={styles.actions}>
        <button className={styles.addToCart}>Add to Cart</button>
        <button className={styles.heartIcon}>
          <FaHeart />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
