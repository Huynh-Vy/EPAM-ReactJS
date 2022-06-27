import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Catalog from 'pages/Catalog';
import Detail from 'pages/Detail/Detail';
import Home from 'pages/Home';
import { Route, Switch } from 'react-router-dom';
import 'swiper/swiper.min.css';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route exact path="/:category" component={Catalog} />
        <Route exact path="/" component={Home} />
        <Route exact path="/:category/:id" component={Detail} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
