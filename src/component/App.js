import {Route, Switch } from 'react-router-dom';
import Home from './Home'
import SportComplex from './SportComplex'

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/sportcomplex" component={SportComplex} />
        <Route path="*" component={Home} />
      </Switch>
    </main>
  );
}

export default App;