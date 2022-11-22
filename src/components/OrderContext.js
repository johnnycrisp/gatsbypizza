import React, { useState } from 'react';

// Create an order context

const OrderContext = React.createContext();

export function OrderProvider({ children }) {
  // add some state at root level
  const [order, setOrder] = useState([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
