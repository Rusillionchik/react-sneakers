import React from "react";
import axios from "axios";
import { Route } from "react-router-dom"; 
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import AppContext from "./context";



console.log(AppContext);

function App() {
  const [catalog, setCatalog] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(true);

 


  React.useEffect(() => {
    async function fetchData() {
      const cartResponse =  await axios.get("https://6658ee0dde346625136ae844.mockapi.io/cart")
      // .then((res) => {
      //   setCartItems(res.data);
      // });
      const itemsResponse = await axios.get("https://6658ee0dde346625136ae844.mockapi.io/catalog")
      // .then((res) => {
      //   setCatalog(res.data);
      // });
      const favoritesResponse =  await axios.get('https://667c9c043c30891b865d205e.mockapi.io/favorites')
      // // .then((res) => {
      // //   setFavorites(res.data)
      // // })
      setisLoading(false)

      setCartItems(cartResponse.data)
      setCatalog(itemsResponse.data)
      setFavorites(favoritesResponse.data)
      
    }
    fetchData()
  }, []);

  const onAddToCart = (obj) => {
    console.log(obj);
    if (cartItems.find((item) => Number(item.id) ===  Number(obj.id))) {
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)))
      axios.delete(`https://6658ee0dde346625136ae844.mockapi.io/cart/${obj.id}`)
    }
      
      else {
    axios.post("https://6658ee0dde346625136ae844.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://6658ee0dde346625136ae844.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
    if (favorites.find((favObj) => favObj.id === obj.id)) {
      axios.delete(`https://667c9c043c30891b865d205e.mockapi.io/favorites/${obj.id}`)
      setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
    }
    else {
      const { data } = await axios.post("https://667c9c043c30891b865d205e.mockapi.io/favorites", obj)
      setFavorites((prev) => [...prev,])
      ;
    } 
  } catch (error) { 
    alert ('Не удалось добавить в фавориты')
  }
}

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
   return cartItems?.some(obj => Number(obj.id) === Number(id)) || false
  }
  return (
    <AppContext.Provider value={{catalog, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems}}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            catalog={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}
        <Header onClickCart={() => setCartOpened(true)} />
        
          <Route path="/" exact>
          <Home catalog={catalog} onAddToCart={onAddToCart} onAddToFavorite={onAddToFavorite} onChangeSearchValue={onChangeSearchValue} searchValue={searchValue} setSearchValue={setSearchValue} cartItems={cartItems} isLoading={isLoading}/>
            </Route>
          
            <Route path="/favorites" exact>
           <Favorites />
            </Route>

            <Route path="/orders" exact>
           <Orders/>
            </Route>
      </div>

      </AppContext.Provider>
  )
}

export default App;