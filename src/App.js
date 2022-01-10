import Meals from "./Components/Meals/Meals";
import Header from "./Components/Layout/Header";
import Cart from "./Components/Cart/Cart";
import { useState } from "react";
import { CartContextProvider } from "./Context/CartContext";

function App() {
  const [isShowCart, setIsShowCart] = useState(false); 

  const hideCart = () => {
    setIsShowCart(false);
  }
  const showCart = () => {
    setIsShowCart(true);
  }

  return (
    <CartContextProvider>
      {isShowCart && <Cart hideCart={hideCart} />}
      <Header showCart={showCart} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
