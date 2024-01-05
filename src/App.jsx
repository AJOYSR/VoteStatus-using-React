// App.js
import React, { useState, useEffect } from 'react';
import ResultCard from './components/ResultCard';
import InputForm from './components/InputForm';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const storedCount = localStorage.getItem('visitCount');
    if (storedCount) {
      setVisitCount(parseInt(storedCount, 10));
    }
  }, []);

  const convertToEnglishDigits = (value) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    for (let i = 0; i < bengaliDigits.length; i++) {
      const regex = new RegExp(bengaliDigits[i], 'g');
      value = value.replace(regex, i.toString());
    }
    return value;
  };

  useEffect(() => {
    setVisitCount((prevCount) => {
      const newCount = prevCount + 1;
      localStorage.setItem('visitCount', newCount);
      return newCount;
    });
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const isValidInput = /^[0-9০১২৩৪৫৬৭৮৯]+$/u.test(e.target.value);
    setErrorMessage(isValidInput ? '' : 'Input must contain only digits (0-9 or ০-৯).');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput()) {
      calculateResult();
    }
  };

  const validateInput = () => {
    const trimmedValue = inputValue.trim();
    const isValidLength = trimmedValue.length === 10 || trimmedValue.length === 13;

    if (!isValidLength) {
      setErrorMessage('Input must have either 10 or 13 digits.');
      return false;
    }

    return true;
  };

  const calculateResult = () => {
    const convertedValue = convertToEnglishDigits(inputValue);
    const sum = convertedValue
      .toString()
      .split('')
      .map(Number)
      .reduce((acc, digit) => acc + digit, 0);

    setResult(sum % 2 === 0 ? 'Yes' : 'No');
    setShowCard(true);
  };

  const handleCloseCard = () => {
    setShowCard(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4 md:p-10">
      <div className="text-center">
        <div className="text-red-700 text-sm md:text-lg mb-2">
          <p className=' ml-4 mr-4'>
            Disclaimer: This is a fun project and does not store any ID information. Please don't take it seriously.
          </p>
          <p className="text-cyan-900 className=' ml-4 mr-4'">
            বিঃদ্রঃ এটি একটি মজা করে বানানো প্রজেক্ট এবং এটি কোনও আইডি তথ্য সংরক্ষণ করে না। দয়া করে এটি সিরিয়াস্লি নেওয়ার চেষ্টা করবেন না।
          </p>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-red-700">
          Know Your vote already given or not!
        </h1>
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-cyan-900">
          আপনার ভোট কি দেয়া হয়েছে কিনা দেখে নিন!
        </h1>
        <InputForm
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        {showCard && <ResultCard showCard={showCard} handleCloseCard={handleCloseCard} result={result} />}
      </div>
      <footer className="footer flex items-center p-4 bg-neutral text-neutral-content mt-4">
        <h1 className='flex items-center text-lg'>
          <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current">
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <span className="ml-2">Copyright Ajoy Sarker © 2024 - All right reserved |</span>
          <span className='ml-4 text-yellow-200'>Visited by {visitCount} {visitCount === 1 ? 'person' : 'people'}</span>
        </h1>
      </footer>
    </div>
  );
};

export default App;
