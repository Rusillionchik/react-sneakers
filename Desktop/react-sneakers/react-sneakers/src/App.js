import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";

function App() {
  const [catalog, setCatalog] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    // fetch("https://6658ee0dde346625136ae844.mockapi.io/catalog")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => setCatalog(json));

    axios
      .get("https://6658ee0dde346625136ae844.mockapi.io/catalog")
      .then((res) => {
        setCatalog(res.data);
      });

    axios
      .get("https://6658ee0dde346625136ae844.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://6658ee0dde346625136ae844.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://6658ee0dde346625136ae844.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((catalog) => catalog.id !== id));
  };

  const onAddToFavorite = (obj) => {
    axios.post("https://6658ee0dde346625136ae844.mockapi.io/favorites", obj);
    setFavorites((prev) => [...prev, obj]);
  };

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          catalog={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}

      <Header onClickCart={() => setCartOpened(true)} />

      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                catalog={catalog}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchValue={onChangeSearchValue}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
              ></Home>
            }
          ></Route>
        </Routes>
      </Router>

      <Route path="/favorites" exact>
        <Favorites></Favorites>
      </Route>
    </div>
  );
}

export default App;
