import { useState } from 'react';
import './App.css';
import { Header } from './Header';
import { Year } from './Year';



function App() {

  const [type, setType] = useState('dia')


  return (
    <div className="App">
      <div className="content">
        <Header type={type} setType={setType} />
        <div class="box-year">
          <Year/>
        </div>
      </div>
    </div>
  );
}

export default App;
