import React, { useEffect } from "react";
import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
    HomePage,
    SignInPage,
    RegisterPage,
    DetailPage,
    SearchPage,
    ShoppingCartPage,
    PlaceOrder,
} from "./pages";
import { Redirect } from "react-router-dom";
import { useSelector } from "./redux/hooks";
import { useDispatch } from "react-redux";
import { getShoppingCart } from "./redux/shoppingCart/slice";

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
    // 私有路由 返回值为routeComponent
    const routeComponent = (props) => {
        // 用户已登录时展示对应页面 未登录跳转至登录页
        return isAuthenticated ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{ pathname: "/signIn" }} />
        );
    };
    return <Route render={routeComponent} {...rest} />;
};

function App() {
    const jwt = useSelector(
        (state) =>
            // 取state中的token判断用户是否登录
            state.user.token
    );

    const dispatch = useDispatch();

    // 通过jwt判断来确定是否执行副作用函数
    useEffect(() => {
        if (jwt) {
            dispatch(getShoppingCart(jwt));
        }
    }, [jwt]);

    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePage}></Route>
                    <Route path="/signIn" component={SignInPage} />
                    <Route path="/register" component={RegisterPage}></Route>
                    <Route
                        path="/detail/:touristRouteId"
                        component={DetailPage}
                    />
                    <Route
                        path="/search:keywords?"
                        component={SearchPage}
                    ></Route>
                    <PrivateRoute
                        isAuthenticated={jwt !== null}
                        path="/shoppingCart"
                        component={ShoppingCartPage}
                    ></PrivateRoute>
                    <PrivateRoute
                        isAuthenticated={jwt !== null}
                        path="/placeOrder"
                        component={PlaceOrder}
                    ></PrivateRoute>
                    <Route
                        render={() => <h1>404 Not Found 页面去火星了</h1>}
                    ></Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
