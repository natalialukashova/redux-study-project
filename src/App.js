import './App.css';
import { Products } from '../src/components/Products/Products';
import { Basket } from '../src/components/Basket/Basket';

function App() {
  return (
    <div className="App">
      <header>
        <Basket />
      </header>
      <main>
        <h1>Каталог товаров</h1>
        <Products />
      </main>
    </div>
  );
}

export default App;