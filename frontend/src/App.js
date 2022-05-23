import './App.css';
import AppRouter from './app/route';
import Header from './app/component/Header';

function App() {
  return (
    <div className="App">
      <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
