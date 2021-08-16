import './App.css';
import Router from './Router';
import Providers from './Providers';

function App() {
  return (
    <Providers>
      <div className="root-container">
        <Router />
      </div>
    </Providers>
  );
}

export default App;
