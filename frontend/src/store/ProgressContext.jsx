import { createContext, useState } from "react";

const ProgressContext = createContext({
    progress: '',
    showCart: () => {},
    hideCart: () => {},
    showPayment: () => {},
    hidePayment: () => {}
});

export function ProgressContextProvider({children}) {
    const [currentProgress, setProgress] = useState('');

    function showCart() {
        setProgress('cart');
    }

    function hideCart() {
        setProgress('');
    }

    function showPayment() {
        setProgress('payment');
    }

    function hidePayment() {
        setProgress('');
    }

    const progressContext = {
        progress: currentProgress,
        showCart,
        hideCart,
        showPayment,
        hidePayment
    };

    return (<ProgressContext.Provider value={progressContext}>{children}</ProgressContext.Provider>);
}

export default ProgressContext