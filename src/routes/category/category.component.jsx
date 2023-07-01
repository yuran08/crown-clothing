import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { selectCategoriesMap } from '../../store/categories/category.selector';

import ProductCard from '../../components/product-card/product-card.component';

import {  CategoryContainer, Title } from './category.style';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const products = categoriesMap[category];

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard  key={product.id} product={product} />
          ))
        }
      </CategoryContainer>
    </Fragment>
  )
}

export default Category;