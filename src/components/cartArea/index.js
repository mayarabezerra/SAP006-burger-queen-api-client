import React from 'react';
import CartItem from '../cartItem';
import './style.css';

export default function CartArea(props) {
  const {
    cartItems, onIncrease, onDecrease, cancelAnOrder, error,
  } = props;
  return (
    <section className="item-list-container">
      <div>
        {cartItems.length === 0 && <p className="empty-cart">Anotar pedidos</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
      {
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            flavor={item.flavor}
            complement={item.complement}
            price={item.price}
            quantity={item.qtd}
            increase={() => onIncrease(item)}
            decrease={() => onDecrease(item)}
            cancelAnOrder={() => cancelAnOrder(item)}
          />
        ))
      }
    </section>
  );
}
