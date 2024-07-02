import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Header(props) {
  const {totalPrice} = useCart()
 
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="Logotype" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Лучший магазин кроссовок</p>
          </div>
        </div>
      </Link>

      <div>
        <ul className="d-flex">
          <li onClick={props.onClickCart} className="mr-30 cu-p">
            <img width={18} height={18} src="/img/cart.png" alt="Корзина" />
            <span>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} руб.</span>
          </li>
          <li className="mr-20 cu-p">
            <Link to="/favorites" exact>
              <img
                className="mr-30 cu-p"
                width={18}
                height={18}
                src="/img/heart.svg"
                alt="Закладки"
              />
            </Link>
          </li>
          <li>
          <Link to="/orders" exact>
              <img
                className="mr-30 cu-p"
                width={18}
                height={18}
                src="/img/user.png"
                alt="Пользователь"
              />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
