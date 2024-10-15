import React, { useState } from 'react'
import {Inputbox} from './components/index'
import useCurrencyInfo from './hooks/useCurrencyInfo';

const App = () => {

  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);
  
  const currenyInfo = useCurrencyInfo(from);
  const options = Object.keys(currenyInfo);

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount((amount * currenyInfo[to]).toFixed(2))
  }

  return (
    <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat' style={{backgroundImage: 'url(https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)'}}>
      <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
          <form onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}>
            <div className='w-full mb-1'>
              <Inputbox label='From' amount={amount} currencyOptions={options} onCurrencyChange={(currency) => setFrom(currency)} onAmountChange={(amount) => setAmount(amount)} selectedCurrency={from} />
            </div>

            <div className='relative w-full h-0.5'>
              <button className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 hover:bg-blue-600/80 transition-all duration-300 ease-in-out text-white px-2 py-0.5' onClick={swap}>Swap</button>
            </div>

            <div className='w-full mb-5'>
              <Inputbox label='To' currencyOptions={options} amount={convertedAmount} onCurrencyChange={(currency) => setTo(currency)} selectedCurrency={to} amountDisabled={true} />
            </div>

            <button type='submit' className='w-full bg-blue-600 hover:bg-blue-700/80 transition-all duration-500 ease-in-out text-white px-4 py-3 rounded-lg'> <span className='block hover:translate-x-5 transition-all duration-500 ease-in-out'>Convert {from.toUpperCase()} to {to.toUpperCase()}</span> </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App