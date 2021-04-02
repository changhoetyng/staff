import { Route, Switch } from "react-router-dom";
import Home from "./Home";

import LoginPage from "./LoginPage";
import ProtectedRoute from "../auth/ProtectedRoute";
import NotFound from "./NotFound";
import ManageStaff from "./ManageStaff";
import NotAuthorized from "./NotAuthorized";
import Settings from "./Settings";

// Sport Complex
import ManageDateSportComplex from "./SportComplex/ManageDateSportComplex";
import ManageSubcategorySportComplex from "./SportComplex/ManageSubcategorySportComplex";
import ManageVenueSportComplex from "./SportComplex/ManageVenueSportComplex";

// Room
import ManageSubcategoryRoom from "./Room/ManageSubcategoryRoom";
import ManageDateRoom from "./Room/ManageDateRoom";
import ManageVenueRoom from "./Room/ManageVenueRoom";

const auth = true;
function App() {
  return (
    <main>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <ProtectedRoute path="/" authed={auth} component={Home} exact />
        <ProtectedRoute path="/settings" authed={false} component={Settings} />
        <ProtectedRoute
          path="/managedatesportcomplex"
          authed={false}
          component={ManageDateSportComplex}
        />
        <ProtectedRoute
          path="/managesubcategorysportcomplex"
          authed={false}
          component={ManageSubcategorySportComplex}
        />
        <ProtectedRoute
          path="/managevenuesportcomplex"
          authed={false}
          component={ManageVenueSportComplex}
        />
        <ProtectedRoute
          path="/managedateroom"
          authed={false}
          component={ManageDateRoom}
        />
        <ProtectedRoute
          path="/managesubcategoryroom"
          authed={false}
          component={ManageSubcategoryRoom}
        />
        <ProtectedRoute
          path="/managevenueroom"
          authed={false}
          component={ManageVenueRoom}
        />
        <ProtectedRoute
          checkAdmin
          path="/managestaff"
          authed={false}
          component={ManageStaff}
        />
        <Route path="/notAuthorized" component={NotAuthorized} />
        <Route path="*" component={NotFound} />
      </Switch>
    </main>
  );
}

export default App;
