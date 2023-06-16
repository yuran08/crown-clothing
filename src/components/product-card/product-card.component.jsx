import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './product-card.style.scss';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const ProductCard = ({ product }) => {
  const { name, id, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <div key={id} className='product-card-container'>
      <img src={imageUrl} alt="product photo" />
      <Button children="Add To Car" buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
    </div>
  );
}

export default ProductCard;