import React, { useState } from "react";

const RomanToNumberConverter = () => {
  const [romanInput, setRomanInput] = useState("");
  const [convertedNumber, setConvertedNumber] = useState(null);
  const [error, setError] = useState("");

  const isValidRomanNumeral = (str) => {
    const romanNumeralRegex =
      /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    return romanNumeralRegex.test(str);
  };

  const convertRomanToNumber = (roman) => {
    const romanNumerals = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    let result = 0;
    for (let i = 0; i < roman.length; i++) {
      if (i > 0 && romanNumerals[roman[i]] > romanNumerals[roman[i - 1]]) {
        result += romanNumerals[roman[i]] - 2 * romanNumerals[roman[i - 1]];
      } else {
        result += romanNumerals[roman[i]];
      }
    }
    return result;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toUpperCase();
    if (isValidRomanNumeral(inputValue)) {
      setRomanInput(inputValue);
      setError("");
    } else {
      setError("Please enter a valid Roman numeral.");
    }
  };

  const handleConvert = () => {
    setConvertedNumber(convertRomanToNumber(romanInput));
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-3xl font-bold mb-6">Roman to Number Converter</h2>
      <div className="flex items-center">
        <input
          type="text"
          value={romanInput}
          onChange={handleInputChange}
          placeholder="Enter Roman numeral..."
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={handleConvert}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md ml-2 focus:outline-none hover:bg-blue-600"
        >
          Convert
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {convertedNumber && (
        <p className="text-xl mt-4">Converted Number: {convertedNumber}</p>
      )}
    </div>
  );
};

export default RomanToNumberConverter;
