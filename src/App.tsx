import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home';
const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;