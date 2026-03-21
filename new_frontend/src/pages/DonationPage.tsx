import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function DonationPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [network, setNetwork] = useState('testnets');
  const [currency, setCurrency] = useState('USDT');
  const [fiatCurrency, setFiatCurrency] = useState('USD');
  const [fiatAmount, setFiatAmount] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');

  // Exchange rates mock
  const rates = {
    USD: 1, // 1 USD = 1 Crypto (USDT/USDC are pegged to USD)
    INR: 83.5, // 1 USD = 83.5 INR
  };

  useEffect(() => {
    if (fiatAmount === '') {
      setCryptoAmount('');
      return;
    }
    const num = parseFloat(fiatAmount);
    if (!isNaN(num)) {
      if (fiatCurrency === 'USD') {
        setCryptoAmount(num.toFixed(2));
      } else if (fiatCurrency === 'INR') {
        setCryptoAmount((num / rates.INR).toFixed(4));
      }
    } else {
      setCryptoAmount('');
    }
  }, [fiatAmount, fiatCurrency]);

  const handleConnect = () => {
    setWalletConnected(true);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body">
      {/* Top Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm dark:shadow-none h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Academic Atelier</Link>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleConnect}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all shadow-sm flex items-center gap-2 ${
              walletConnected 
                ? 'bg-green-100 text-green-800 border-green-200 border' 
                : 'bg-primary text-on-primary hover:bg-primary/90 hover:shadow-md'
            }`}
          >
            <span className="material-symbols-outlined text-sm dark:text-inherit">{walletConnected ? 'check_circle' : 'account_balance_wallet'}</span>
            {walletConnected ? 'Wallet Connected: 0x...a1b2' : 'Connect Wallet'}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-6">
        <div className="w-full max-w-lg bg-surface-container-lowest p-8 rounded-[2rem] shadow-2xl shadow-primary/10 border border-outline-variant/20 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>

          <div className="mb-8 text-center relative z-10">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
            <h1 className="font-headline text-3xl font-bold text-on-surface mb-2">Support the Atelier</h1>
            <p className="text-on-surface-variant text-sm">Empower AI-assisted learning with a crypto donation.</p>
          </div>

          <form className="space-y-6 relative z-10" onSubmit={e => e.preventDefault()}>
            
            {/* Network & Currency Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wide">Network</label>
                <div className="relative">
                  <select 
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                    className="w-full h-12 px-4 appearance-none rounded-xl border border-outline-variant bg-surface-container-low focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-on-surface"
                  >
                    <option value="testnets">Testnets</option>
                    <option value="mainnet">Mainnet</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 text-outline pointer-events-none">expand_more</span>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wide">Token</label>
                <div className="relative">
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full h-12 px-4 appearance-none rounded-xl border border-outline-variant bg-surface-container-low focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium text-on-surface"
                  >
                    <option value="USDT">USDT</option>
                    <option value="USDC">USDC</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 text-outline pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-outline-variant/30 my-4"></div>

            {/* Amount Input */}
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wide">Donation Amount</label>
              <div className="flex gap-4 items-start">
                {/* Fiat Input */}
                <div className="flex-1 relative">
                  <div className="absolute left-3 top-3 text-outline font-bold">
                    {fiatCurrency === 'USD' ? '$' : '₹'}
                  </div>
                  <input 
                    type="number"
                    min="0"
                    step="0.01"
                    value={fiatAmount}
                    onChange={(e) => setFiatAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full h-12 pl-8 pr-16 rounded-xl border border-outline-variant bg-surface-container-low focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-bold text-lg text-on-surface"
                  />
                  <div className="absolute right-1 top-1">
                    <select
                      value={fiatCurrency}
                      onChange={(e) => setFiatCurrency(e.target.value)}
                      className="h-10 px-2 bg-transparent border-none text-sm font-semibold text-on-surface-variant focus:ring-0 cursor-pointer outline-none"
                    >
                      <option value="USD">USD</option>
                      <option value="INR">INR</option>
                    </select>
                  </div>
                </div>

                {/* Conversion Equal Sign */}
                <div className="flex flex-col justify-center h-12">
                  <span className="material-symbols-outlined text-outline">sync_alt</span>
                </div>

                {/* Crypto Amount Readonly */}
                <div className="flex-1 relative">
                  <input 
                    type="text"
                    readOnly
                    value={cryptoAmount}
                    placeholder="0.00"
                    className="w-full h-12 px-4 pr-16 rounded-xl border border-transparent bg-surface-container-high text-on-surface font-bold text-lg flex items-center cursor-not-allowed opacity-90"
                  />
                  <div className="absolute right-4 top-3 text-sm font-semibold text-primary">
                    {currency}
                  </div>
                </div>
              </div>
            </div>

            <button 
              disabled={!walletConnected || !parseFloat(fiatAmount)}
              className="mt-6 w-full h-14 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
              Complete Donation
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
