import {Route, Switch } from 'react-router-dom';
import Home from './Home'
import SportComplex from './SportComplex'
import LoginPage from './LoginPage'
import ProtectedRoute from "../auth/ProtectedRoute"
const auth = true;
function App() {
return (
    <main>
      <Switch>
        <Route path="/login" component={LoginPage} exact/>
        <ProtectedRoute path="/" authed = {auth} component={Home} exact/>
        <ProtectedRoute path="/sportcomplex" authed = {false} component={SportComplex} />
        <Route path="*" component={LoginPage} />
      </Switch>
    </main>
  );
}

export default App;