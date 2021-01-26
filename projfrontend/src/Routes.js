import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom"
import Home from "./core/Home"
import Signup from "./user/Signup"
import Signin from "./user/Signin"
import PrivateRoutes from "./auth/helper/PrivateRoutes"
import AdminRoutes from "./auth/helper/AdminRoutes"
import UserDashboard from "./user/UserDashBoard"
import AdminDashboard from "./user/AdminDashBoard"
import AddCategory from "./admin/AddCategory"

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <PrivateRoutes exact path="/user/dashboard" component={UserDashboard} />
                <AdminRoutes exact path="/admin/dashboard" component={AdminDashboard} />
                <AdminRoutes exact path="/admin/create/category" component={AddCategory} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
