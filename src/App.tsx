import React from 'react';
import './App.css';
import '@radix-ui/themes/styles.css';

import { Theme } from '@radix-ui/themes';
import Header from './components/Header/Header';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';

function App() {
  return (
    <div className="App">
      <Theme>
        <Header />
        <CurrencyConverter />
      </Theme>
      </div>
  );
}

export default App;
