import React, { createContext, useState } from 'react';

const UserProgressContext = createContext({
    progress: '',
    showModal: () => {},
    hideModal: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
});

export const UserProgressContextProvider = ( { children } ) => {
    const [userProgress, setUserProgress] = useState('');

    const showModal = () =>{
        setUserProgress("cart");
    }

    const hideModal = () =>{
        setUserProgress("");
    }

    const showCheckout = () =>{
        setUserProgress("checkout");
    }

    const hideCheckout = () =>{
        setUserProgress("");
    }

    const UserProgressContextValue = {
        progress: userProgress,
        showModal,
        hideModal,
        showCheckout,
        hideCheckout
    }

  return (
    <UserProgressContext.Provider value={UserProgressContextValue}>
      {children}
    </UserProgressContext.Provider>
  )
}

export default UserProgressContext
