import {Route, Switch } from 'react-router-dom';
import Home from './Home'
import SportComplex from './SportComplex'
import LoginPage from './LoginPage'
import ProtectedRoute from "../auth/ProtectedRoute"
import NotFound from "./NotFound"
import Settings from "./Settings"

const auth = true;
function App() {
return (
    <main>
      <Switch>
        <Route path="/login" component={LoginPage} exact/>
        <ProtectedRoute path="/" authed = {auth} component={Home} exact/>
        <ProtectedRoute path="/sportcomplex" authed = {false} component={SportComplex} />
        <ProtectedRoute path="/settings" authed = {false} component={Settings} />
        <Route path="*" component={NotFound} />
      </Switch>
    </main>
  );
}

export default App;