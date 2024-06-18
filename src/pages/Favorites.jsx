import Card from "../components/Card";

function Favorites({catalog, onAddToFavorite}) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap">{catalog
          .map((item) => (
            <Card
              favorited={true}
              onAddToFavorite={onAddToFavorite}
              {...item}
            />
          ))}</div>
    </div>
  );
}

export default Favorites;
