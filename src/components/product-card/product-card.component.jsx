import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { ProductCartContainer, Footer, Name, Price } from './product-card.style';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const ProductCard = ({ product }) => {
  const { name, id, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCartContainer key={id}>
      <img src={imageUrl} alt="product photo" />
      <Button children="Add To Car" buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
    </ProductCartContainer>
  );
}

export default ProductCard;