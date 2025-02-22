import React from 'react';
import styles from './style.module.css';
import status from '../../constants/constants';

export function Card(props) {
  const { product, onIncrease } = props;
  return (
    <div className={styles['container-card']}>
      <div className={styles['image-container']}>
        <img src="https://media.istockphoto.com/photos/bacon-burger-picture-id520215281?b=1&k=20&m=520215281&s=170667a&w=0&h=zeCb3SA1h2PJhk21K2jFR8QttbqMBq4L-8uGkQLH7OQ=" alt="item do cardápio" className={styles.image} />
      </div>
      <div className={styles.item}>
        <p>{product.name} {product.flavor} {product.complement ? `+ ${product.complement}` : ''}</p>
        <p>R${product.price}</p>
      </div>
      <div className={styles['controller-container']}>
        <button
          className={styles['add-item-button']}
          type="button"
          onClick={() => onIncrease(product)}
        >
          Adicionar ao pedido
        </button>
      </div>
    </div>

  );
}

export function CardOrder(props) {
  const { item, onClick } = props;
  const dataCreated = new Date(item.createdAt);
  const dataUpdate = new Date(item.updatedAt);
  const difference = Math.abs(dataUpdate) - dataCreated;
  const minute = Math.floor(difference / 1000 / 60);

  let className = '';
  switch (item.status) {
    case status.pending: className = styles['status-pending-button']; break;
    case status.preparing: className = styles['status-preparing-button']; break;
    case status.ready: className = styles['status-finished-button']; break;
    case status.delivery: className = styles['status-delivery-button']; break;
    case status.delivered: className = styles['status-delivered-button']; break;
    default:
      className = styles['status-pending-button']; break;
  }

  return (
    <div className={styles['container-card-order']}>
      <section>
        <div className={styles['timer-container']}>
          <p> {minute} min</p>
        </div>
        <div className={styles['client-data']}>
          <p>Mesa - {item.table}</p>
          <p>Cliente - {item.client_name}</p>
        </div>
        <div className={styles['order-list']}>
          <ul className={styles.products}>
            {item.Products.map((order) => (
              <li key={order.id}>
                {order.name} {order.qtd > 1 ? `${order.qtd}x` : ''} {order.flavor} {order.complement ? `+ ${order.complement}` : ''}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['controller-order-container']}>
          <button
            className={className}
            type="button"
            onClick={() => {
              onClick(item);
            }}
          >
            {item.status === status.pending ? 'Pendente' : item.status}
          </button>
        </div>
      </section>
    </div>
  );
}
