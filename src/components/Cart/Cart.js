import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import SubmitOrder from './SubmitOrder';

const Cart = (props) => {
  const [isSubmitOrderAvailable, setIsSubmitOrderAvailable] = useState(false);
  const [isDataSubmiting, setIsDataSubmiting] = useState(false);
  const [wasDataSendingSuccessfull, setWasDataSendingSuccessfull] = useState(false);

  const cartContext = useContext(CartContext);

  const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const removeCartItemHandler = (id) => {
    cartContext.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsSubmitOrderAvailable(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsDataSubmiting(true);

    await fetch('https://http-react-course-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedMeals: cartContext.items,
      }),
    });
    setIsDataSubmiting(false);
    setWasDataSendingSuccessfull(true);
    cartContext.clearCart();
  };

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalButtons = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Итого</span>
        <span>{totalAmount}</span>
      </div>
      {isSubmitOrderAvailable && (
        <SubmitOrder onCancel={props.onHideCart} onSubmit={submitOrderHandler} />
      )}
      {!isSubmitOrderAvailable && modalButtons}
    </React.Fragment>
  );

  const dataSubmitingCartModalContent = <p>Submitting order details...</p>;

  const dataWasSubmittedModalContent = (
    <React.Fragment>
      <p>Your order has been sent successfully</p>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isDataSubmiting && !wasDataSendingSuccessfull && cartModalContent}
      {isDataSubmiting && dataSubmitingCartModalContent}
      {wasDataSendingSuccessfull && dataWasSubmittedModalContent}
    </Modal>
  );
};
export default Cart;
