import React from 'react';
import styles from './ProductCard.module.scss';
import { FaHeart } from 'react-icons/fa';
import { ProductCardProps } from '@/app/interfaces/products';
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        {' '}
        <Image
          src={product.photo}
          alt={product.description}
          className={styles.productPhoto}
          width={500}
          height={500}
        />
        <span className={styles.discountLabel}>-14%</span>{' '}
        <button className={styles.quickViewButton}>Quick View</button>{' '}
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
        <Rating
          name="product-rating"
          value={product.rating}
          precision={0.5}
          Controlled
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
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
