import React from 'react';

const App = () => {
  const key = import.meta.env;
  console.log(key);

  return (
    <div className="bg-red-500 text-[#aa4242]">
      App4
    </div>
  )
}

export default App
