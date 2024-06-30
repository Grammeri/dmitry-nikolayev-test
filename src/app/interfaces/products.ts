export interface Product {
  id: number;
  photo: string;
  initialPrice: number;
  discountedPrice: number;
  description: string;
  rating: number;
  votes: number;
  installment: string;
}

export interface ProductCardProps {
  product: Product;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}
