import { createStore, applyMiddleware } from "redux"; //store就是一个带有推送功能的数据仓库
import languageReducer from "./language/languageReducer"; // reducer就是仓库中处理数据的方法,其中详细记录了各种数据的处理过程
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import { actionLog } from "./middlewares/actionlog";
import { ProductDetailSlice } from "./productDetail/slice";
import thunk from "redux-thunk";
// Redux-thunk可以使 store.dispatch(action)中的action可以是函数类型，从而可以进行异步请求(axios)等处理
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ProductSearchSlice } from "./productSearch/slice";
import { userSlice } from "./user/slice";
import { ShoppingCartSlice } from "./shoppingCart/slice";
import { orderSlice } from "./order/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //使用的是localstorage

const persistConfig = {
    key: "root",
    storage,
    whiteList: ["user"], //把redux中user的部分全部保存起来
};

// 所有reducer的集合体，约定俗成的名称
const rootRoducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: ProductDetailSlice.reducer, //删除redux中的combineReducers从RTK中引入 这样可以处理slice中的reducer
    productSearch: ProductSearchSlice.reducer,
    user: userSlice.reducer, //user数据来源 userSlice.reducer
    shoppingCart: ShoppingCartSlice.reducer,
    order: orderSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootRoducer);

// 使用react-thunk中间件，让dispatch支持函数类型
// const store = createStore(rootRoducer, applyMiddleware(thunk, actionLog));
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        actionLog,
    ],
    devTools: true,
});

const persistor = persistStore(store); //持久化store

export type RootState = ReturnType<typeof store.getState>;

export default { store, persistor };
