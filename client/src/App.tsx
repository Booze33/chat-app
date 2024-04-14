import React from 'react';
import 'dotenv/config';

const App = () => {
  const key = process.env;
  console.log(key);

  return (
    <div className="bg-red-500 text-[#aa4242]">
      App4
    </div>
  )
}

export default App
