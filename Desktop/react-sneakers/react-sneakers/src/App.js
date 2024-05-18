import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr = [
  {
    name: "Мужские кроссовки Nike Air Max 90",
    price: "23 999 руб.",
    imageUrl: "/img/sneakers/1.jpg",
  },
  {
    name: "Мужские кроссовки Nike Lebron Witness 8",
    price: "18 999 руб.",
    imageUrl: "/img/sneakers/2.jpg",
  },
  {
    name: "Мужские кроссовки Nike LeBron Witness VII",
    price: "18 999 руб.",
    imageUrl: "/img/sneakers/3.jpg",
  },
  {
    name: "Мужские кроссовки Nike Tech Hera",
    price: "18 999 руб.",
    imageUrl: "/img/sneakers/4.jpg",
  },
  {
    name: "Мужские кроссовки Jordan Dub Zero",
    price: "24 999 руб.",
    imageUrl: "/img/sneakers/5.jpg",
  },
];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"></img>
            <input placeholder="Поиск..."></input>
          </div>
        </div>
        <div className="d-flex">
          {arr.map((obj) => (
            <Card title={obj.name} price={obj.price} imageUrl={obj.imageUrl} />
          ))}
        </div>
      </div>
      ....
    </div>
  );
}

export default App;
