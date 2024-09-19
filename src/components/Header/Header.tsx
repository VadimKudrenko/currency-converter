import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import axios from "axios";

import "./Header.css";

interface IHeaderCurrencyRate {
  ccy: string;
  buy: string;
  sale: string;
}

function Header() {
  const [currenciesRate, setCurrenciesRate] = useState<
    IHeaderCurrencyRate[] | null
  >(null);

  useEffect(() => {
    axios
      .get("/privatbank-api/p24api/pubinfo?exchange&json&coursid=11")
      .then((response) => {
        setCurrenciesRate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <header className="header-component">
      {currenciesRate ? (
        <Marquee
          className="header__marquee"
          autoFill={true}
          pauseOnHover={true}
          speed={25}
        >
          <div className="header__marquee-item-wrapper header__marquee-item-wrapper--dollar">
            <span>
              € {Number(currenciesRate[0].buy).toFixed(2)} |{" "}
              {Number(currenciesRate[0].sale).toFixed(2)}
            </span>
          </div>
          <div className="header__marquee-item-wrapper header__marquee-item-wrapper--euro">
            <span>
              $ {Number(currenciesRate[1].buy).toFixed(2)} |{" "}
              {Number(currenciesRate[1].sale).toFixed(2)}
            </span>
          </div>
        </Marquee>
      ) : (
        <Marquee
          className="header__marquee"
          autoFill={true}
          pauseOnHover={true}
          speed={25}
        >
          <div className="header__marquee-item-wrapper header__marquee-item-wrapper--dollar">
            <span>$~/~</span>
          </div>
          <div className="header__marquee-item-wrapper header__marquee-item-wrapper--euro">
            <span>€~/~</span>
          </div>
        </Marquee>
      )}
    </header>
  );
}

export default Header;
