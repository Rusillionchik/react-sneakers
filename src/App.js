import React from "react";
import axios from "axios";
import { Route } from "react-router-dom"; 
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
    axios.get("https://6658ee0dde346625136ae844.mockapi.io/catalog").then((res) => {
      setCatalog(res.data);
    });

    axios.get("https://6658ee0dde346625136ae844.mockapi.io/cart").then((res) => {
      setCartItems(res.data);
    });

    axios.get('https://6658ee0dde346625136ae844.mockapi.io/favorites').then((res) => {
      setFavorites(res.data)
    })
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://6658ee0dde346625136ae844.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://6658ee0dde346625136ae844.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    if (favorites.find((favObj) => favObj.id !== obj.id)) {
      axios.delete(`https://6658ee0dde346625136ae844.mockapi.io/favorites/${obj.id}`)
      
    }
    else {
      const { data } = await 
      axios.post("https://6658ee0dde346625136ae844.mockapi.io/favorites", obj);
    }
    setFavorites((prev) => [...prev,obj]);
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
        
          <Route path="/">
          <Home catalog={catalog} onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} onChangeSearchValue={onChangeSearchValue} searchValue={searchValue} setSearchValue={setSearchValue} />
            </Route>
          
            <Route path="/favorites" exact>
           <Favorites catalog={catalog} onAddToFavorite={onAddToFavorite}/>
            </Route>
      </div>
    
  );
}

export default App;