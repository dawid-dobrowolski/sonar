import { useContext } from 'react';
import shopLogo from '../../assets/cpu.png'
import cartLogo from '../../assets/trolley.png'

import './Header.css'
import ProgressContext from '../../store/ProgressContext';

function Header(){
    const progressContext = useContext(ProgressContext);

    function handleShowCart(){
        progressContext.showCart();
    }

    return(
        <header>
            <nav>
                <div data-cy="shopLogo" className="shopLogo">
                    <img src={shopLogo} />
                    <span className="shopLogoText">ElektroBit.pl</span>
                </div>
                <div className="cartLogo">
                    <button onClick={handleShowCart}>
                        <img src={cartLogo} />
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Header