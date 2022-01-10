import React, { useReducer } from "react";

const CartContext = React.createContext({
  itemsList: [],
  totalPrice: 0,
  amountOfItems: 0,
  addItemsToList: (newItem) => {},
  removeItemsFromList: (item) => {},
  orderComplete: () => {},
});

const cartReducer = (state, actions) => {
  if (actions.type === "ADD_ITEM") {

    let newItemsList = [...state.itemsList];
    const itemIndex = state.itemsList.findIndex((item) => item.id === actions.newItem.id);
    if (newItemsList[itemIndex]) {
      newItemsList[itemIndex].amount += actions.newItem.amount;
    } else {
      newItemsList = newItemsList.concat(actions.newItem);
    }


    return {
      amountOfItems: state.amountOfItems,
      totalPrice: state.totalPrice,
      itemsList: newItemsList,
    };
  }

  if (actions.type === "REMOVE_ITEM") {
    const isAmountGreaterThanOne = state.itemsList.some(
      (item) => item.name === actions.removedItem.name && item.amount > 1
    );
    const isAmountEqualToOne = state.itemsList.some(
      (item) => item.name === actions.removedItem.name && item.amount === 1
    );
    let newItemsList = [];
    if (isAmountGreaterThanOne) {
      newItemsList = state.itemsList.map((item) => {
        if (item.name === actions.removedItem.name) {
          --item.amount;
        }
        return item;
      });
    } else if (isAmountEqualToOne) {
      newItemsList = state.itemsList.filter((item) => {
        return item.name !== actions.removedItem.name;
      });
    }

    return {
      amountOfItems: state.amountOfItems,
      totalPrice: state.totalPrice,
      itemsList: newItemsList,
    };
  }
  if (actions.type === "UPDATE_AMOUNT_AND_TOTAL_PRICE") {
    // count total price
    let totalPrice = 0;
    if (state.itemsList.length > 0) {
      totalPrice = state.itemsList.map((item) => {
        return item.price * item.amount;
      });
      totalPrice = totalPrice.reduce(
        (previousValue, currentValue) => previousValue + currentValue
      );
    }

    // count amount of items
    let amountOfItems = 0;
    if (state.itemsList.length > 0) {
      amountOfItems = state.itemsList.map((item) => {
        return item.amount;
      });
      amountOfItems = amountOfItems.reduce(
        (previousValue, currentValue) => previousValue + currentValue
      );
    }
    return {
      amountOfItems: amountOfItems,
      totalPrice: totalPrice,
      itemsList: state.itemsList,
    };
  }
  if (actions.type === "ORDER_COMPLETE") {
    return {
      amountOfItems: 0,
      totalPrice: 0,
      itemsList: [],
    };
  }
};

export const CartContextProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, {
    itemsList: [],
    totalPrice: 0,
    amountOfItems: 0,
  });

  //   useEffect(() => {

  //   }, [itemsList]);

  const addItemsToList = (newItem) => {
    dispatchCart({ type: "ADD_ITEM", newItem: newItem });
    dispatchCart({ type: "UPDATE_AMOUNT_AND_TOTAL_PRICE" });
  };

  const removeItemsFromList = (removedItem) => {
    dispatchCart({ type: "REMOVE_ITEM", removedItem: removedItem });
    dispatchCart({ type: "UPDATE_AMOUNT_AND_TOTAL_PRICE" });
  };

  const orderComplete = () => {
    dispatchCart({ type: "ORDER_COMPLETE" });
  };
  const cartContext = {
    itemsList: cartState.itemsList,
    totalPrice: cartState.totalPrice,
    amountOfItems: cartState.amountOfItems,
    addItemsToList: addItemsToList,
    removeItemsFromList: removeItemsFromList,
    orderComplete: orderComplete,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
