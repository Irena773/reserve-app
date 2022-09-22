import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Top } from "./pages/Top";

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  return (
    
    <BrowserRouter>
      <Routes>
      <Route path={"/"} element={<Top setAccessToken={setAccessToken} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
