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
import ManageCategories from "./admin/ManageCategories"
import AddProduct from "./admin/AddProduct"
import ManageProducts from "./admin/ManageProducts"
import UpdateProduct from "./admin/UpdateProduct"
import Cart from "./core/Cart"

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/cart" component={Cart} />
                <PrivateRoutes exact path="/user/dashboard" component={UserDashboard} />
                <AdminRoutes exact path="/admin/dashboard" component={AdminDashboard} />
                <AdminRoutes exact path="/admin/create/category" component={AddCategory} />
                <AdminRoutes exact path="/admin/categories" component={ManageCategories} />
                <AdminRoutes exact path="/admin/create/product" component={AddProduct} />
                <AdminRoutes exact path="/admin/products" component={ManageProducts} />
                <AdminRoutes exact path="/admin/product/update/:productId" component={UpdateProduct} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
