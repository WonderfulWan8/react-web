// redecuer从store中分割出来的一个子模块
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// PayloadAction 用于自定义action类型
interface ProductDetailState {
    loading: boolean;
    error: string | null;
    data: any;
}
const initialState: ProductDetailState = {
    loading: true,
    error: null,
    data: null,
};

// createAsyncThunk 处理异步的中间件
export const getProductDetail = createAsyncThunk(
    "productDetail/getProductDetail",
    async (touristRouteId: string, thunkAPI) => {
        // 创建slice时会把action和reducer捆绑起来
        // 但在分发时 还是要使用相对应的actioncreator指定action的类型以及数据
        // dispatch里面的参数是会返回action的函数 RTK会根据reducer的函数签名 自动的生成actioncreator
        // thunkAPI.dispatch(ProductDetailSlice.actions.fetchStart());
        // try {
        //     const { data } = await axios.get(
        //         `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
        //     );
        //     thunkAPI.dispatch(ProductDetailSlice.actions.fetchSuccess(data));
        // } catch (error: any) {
        //     thunkAPI.dispatch(
        //         ProductDetailSlice.actions.fetchFail(error.message)
        //     );
        // }
        const { data } = await axios.get(
            `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
        );
        return data;
    }
);
export const ProductDetailSlice = createSlice({
    // immer会把所有的reducer中所有的代码自动转化为immutable（不可变的
    // 并且输出一个全新的对象
    name: "productDetail",
    initialState,
    reducers: {},
    extraReducers: {
        [getProductDetail.pending.type]: (state) => {
            // return { ...state, loading: true };
            state.loading = true;
        },
        [getProductDetail.fulfilled.type]: (state, action) => {
            // 使用action的payload更新状态state
            state.data = action.payload; //action.payload带来的就是api的返回数据
            state.loading = false;
            state.error = null;
        },
        [getProductDetail.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            const add = action.payload;
            state.loading = false;
            state.error = action.payload;
        },
    },
});
