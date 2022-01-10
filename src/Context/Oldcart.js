import React, { useState, useEffect } from "react";

const CartContext = React.createContext({
  itemsList: [],
  totalPrice: 0,
  amountOfItems: 0,
  addItemsToList: (newItem) => {},
  removeItemsFromList: (item) => {},
  orderComplete: () => {},
});

 const CartContextProvider = (props) => {
  const [itemsList, setItemsList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [amountOfItems, setAmountOfItems] = useState(0);

//   useEffect(() => {

//   }, [itemsList]);

 

  const orderComplete = () => {
    setItemsList([]);
    setTotalPrice(0);
    setAmountOfItems(0);
  };
  const addItemsToList = (newItem) => {
    newItem.amount = +newItem.amount;
    if (itemsList.some((item) => item.name === newItem.name)) {
      const newItemsList = itemsList.map((item) => {
        if (item.name === newItem.name) {
          item.amount += newItem.amount;
        }
        return item;
      });
      setItemsList(newItemsList);
    } else {
      setItemsList((prevItemsList) => {
        return [...prevItemsList, newItem];
      });
      }
    //   updateTotalPrice();
    //   updateAmountOfItems();
  };

  const removeItemsFromList = (removedItem) => {
    const isAmountGreaterThanOne = itemsList.some(
      (item) => item.name === removedItem.name && item.amount > 1
    );
    const isAmountEqualToOne = itemsList.some(
      (item) => item.name === removedItem.name && item.amount === 1
    );

    if (isAmountGreaterThanOne) {
      const newItemsList = itemsList.map((item) => {
        if (item.name === removedItem.name) {
          --item.amount;
        }
        return item;
      });
      setItemsList(newItemsList);
    } else if (isAmountEqualToOne) {
      const newItemsList = itemsList.filter((item) => {
        return item.name !== removedItem.name;
      });
      setItemsList(newItemsList);
      }
    //   updateTotalPrice();
    //   updateAmountOfItems();
  };
  const updateTotalPrice = () => {
    let sum = 0;
    if (itemsList.length > 0) {
      sum = itemsList.map((item) => {
        return item.price * item.amount;
      });
      sum = sum.reduce(
        (previousValue, currentValue) => previousValue + currentValue
      );
    }
    setTotalPrice(sum);
  };
  const updateAmountOfItems = () => {
    let sum = 0;
    if (itemsList.length > 0) {
      sum = itemsList.map((item) => {
        return item.amount;
      });
      sum = sum.reduce(
        (previousValue, currentValue) => previousValue + currentValue
      );
    }
    setAmountOfItems(sum);
  };

  return (
    <CartContext.Provider
      value={{
        itemsList: itemsList,
        totalPrice: totalPrice,
        amountOfItems: amountOfItems,
        addItemsToList: addItemsToList,
        removeItemsFromList: removeItemsFromList,
        orderComplete: orderComplete,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

