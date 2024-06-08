import fetch from 'node-fetch';
import { WINDOW_SIZE, TEST_SERVER_TIMEOUT, TEST_SERVER_BASE_URL, CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN } from '../utils/constants.js';

const window = [];

export async function getNumbers(numberId) {
  const url = `${TEST_SERVER_BASE_URL}/test/${getNumberType(numberId)}`;

  const response = await fetch(url, { 
    timeout: TEST_SERVER_TIMEOUT,
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'x-client-id': CLIENT_ID, 
      'x-client-secret': CLIENT_SECRET,
    }
   });
  if (!response.ok) {
    throw new Error(`Test server error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.numbers || !Array.isArray(data.numbers)) {
    throw new Error('Invalid response from test server');
  }

  const numbers = data.numbers;
  updateWindow(numbers);
  
  const windowPrevState = [...window];
  const avg = calculateAverage(window);
  const windowCurrState = [...window];

  return {
    numbers,
    windowPrevState,
    windowCurrState,
    avg: parseFloat(avg.toFixed(2)), // Round to 2 decimal places
  };
}

function getNumberType(numberId) {
  switch (numberId) {
    case 'e': return 'even';
    case 'p': return 'primes';
    case 'f': return 'fibo';
    case 'r': return 'rand';
    default: throw new Error('Invalid number ID');
  }
}

function updateWindow(newNumbers) {
  newNumbers.forEach(num => {
    if (!window.includes(num) && window.length < WINDOW_SIZE) {
      window.push(num);
    } else if (window.length >= WINDOW_SIZE) {
      window.shift(); // Remove oldest number
      window.push(num);
    }
  });
}

function calculateAverage(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}
