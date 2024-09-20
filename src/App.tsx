import React from 'react';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './App.css';

import Header from './components/Header/Header';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';
import Description from './components/Description/Description';

function App() {

  return (
    <div className="App">
      <Theme>
        <Header />
        <CurrencyConverter />

        <Description/>
      </Theme>
    </div>
  );
}

export default App;
