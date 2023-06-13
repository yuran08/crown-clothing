import './product-card.style.scss';

import Button from '../button/button.component';

const ProductCard = ({ product }) => {
  const { name, id, imageUrl, price } = product;
  return (
    <div key={id} className='product-card-container'>
      <img src={imageUrl} alt="product photo" />
      <Button children="Add To Car" buttonType='inverted' />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
    </div>
  );
}

export default ProductCard;