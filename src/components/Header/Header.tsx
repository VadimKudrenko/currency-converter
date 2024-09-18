import Marquee from "react-fast-marquee";

import './Header.css'

function Header() {
  return (
    <header className="header-component">
      <Marquee className="header__marquee" autoFill={true} pauseOnHover={true} speed={25} >
        <div className="header__marquee-item-wrapper header__marquee-item-wrapper--dollar">
          <span>$41.1/41.7</span>
        </div>
        <div className="header__marquee-item-wrapper header__marquee-item-wrapper--euro">
          <span>€45.55/46.55</span>
        </div>
      </Marquee>
    </header>
  );
}

export default Header;
