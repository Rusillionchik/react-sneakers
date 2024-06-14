import React from "react";
import cardStyles from "./Card.module.scss";

function Card({ onFavorite, imageUrl, title, price, onPlus }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const onClickPlus = () => {
    onPlus({ imageUrl, title, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ imageUrl, title, price });
    setIsFavorite(!isFavorite);
  };

  React.useEffect(() => {}, [isAdded]);

  return (
    <div className={cardStyles.card}>
      <div className={cardStyles.favorite} onClick={onClickFavorite}>
        <img
          src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
          alt="Unliked"
        ></img>
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Цена:</span>
          <b>{price}</b>
        </div>
        <img
          className={cardStyles.plus}
          onClick={onClickPlus}
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="Plus"
        ></img>
      </div>
    </div>
  );
}

export default Card;
