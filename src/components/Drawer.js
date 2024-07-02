import React from "react";
import Info from "./Card/Info";
import axios from "axios";
import { useCart } from "../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, onRemove, catalog = [] }) {
  const {cartItems, setCartItems, totalPrice} = useCart()
  const [orderId, setOrderId] = React.useState(null)
const [isOrderComplete, setIsOrderComplete] = React.useState(false)
const [isLoading, setIsLoading] = React.useState(false)



const onClickOrder = async () => {
 try {
  setIsLoading(true)
  const {data} = await axios.post("https://667c9c043c30891b865d205e.mockapi.io/orders", {
    catalog: cartItems,
  })
  
  setOrderId(data.id)
  setIsOrderComplete(true)
  setCartItems([])


   for (let i = 0; i < Array.length; i++) {
    const item = cartItems[i];
    await axios.delete("https://6658ee0dde346625136ae844.mockapi.io/cart/" + item.id);
    await delay(1000)
   }

  
 } catch (error) {
  alert ('Ошибка при создании заказа :(')
 }
 setIsLoading(false)
}

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onClose}
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {catalog.length > 0 ? (
          <div className="d-flex flex-column flex"> 
            <div className="items">
              {catalog.map((obj) => (
                <div key = {obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price}</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                  ></img>
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info 
          title={isOrderComplete? "Заказ оформлен!" : "Корзина пустая"} 
          description={isOrderComplete? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`: "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} 
          image={isOrderComplete? "/img/complete-order.jpg" : "/img/empty-cart.jpg" }/>
        )}
      </div>
    </div>
  );
}

export default Drawer;
