import {Route, Switch } from 'react-router-dom';
import Home from './Home'
import SportComplex from './SportComplex'
import LoginPage from './LoginPage'
import ProtectedRoute from "../auth/ProtectedRoute"
import NotFound from "./NotFound"
import Settings from "./Settings"
import AddSubcategory from "./AddSubcategory"
import ManageVenue from "./ManageVenue"
import ManageStaff from "./ManageStaff"

const auth = true;
function App() {
return (
    <main>
      <Switch>
        <Route path="/login" component={LoginPage} exact/>
        <ProtectedRoute path="/" authed = {auth} component={Home} exact/>
        <ProtectedRoute path="/sportcomplex" authed = {false} component={SportComplex} />
        <ProtectedRoute path="/addsubcategory" authed = {false} component={AddSubcategory} />
        <ProtectedRoute path="/settings" authed = {false} component={Settings} />
        <ProtectedRoute path="/managevenue" authed = {false} component={ManageVenue} />
        <ProtectedRoute path="/managestaff" authed = {false} component={ManageStaff} />
        <Route path="*" component={NotFound} />
      </Switch>
    </main>
  );
}

export default App;