// redecuer从store中分割出来的一个子模块
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// PayloadAction 用于自定义action类型
interface ProductSearchState {
    loading: boolean;
    error: string | null;
    data: any;
    pagination: any;
}
const initialState: ProductSearchState = {
    loading: true,
    error: null,
    data: null,
    pagination: null,
};

// createAsyncThunk 处理异步的中间件
export const searchProduct = createAsyncThunk(
    "productSearch/searchProduct",
    async (
        paramaters: {
            keywords: string;
            nextPage: number | string;
            pageSize: number | string;
        },
        thunkAPI
    ) => {
        let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${paramaters.nextPage}&pageSize=${paramaters.pageSize}`;
        if (paramaters.keywords) {
            url += `&keywords=${paramaters.keywords}`;
        }
        const response: any = await axios.get(url);
        return {
            data: response.data,
            pagination: JSON.parse(response.headers["x-pagination"]),
        };
    }
);
export const ProductSearchSlice = createSlice({
    // immer会把所有的reducer中所有的代码自动转化为immutable（不可变的
    // 并且输出一个全新的对象
    name: "productSearch",
    initialState,
    reducers: {},
    extraReducers: {
        [searchProduct.pending.type]: (state) => {
            // return { ...state, loading: true };
            state.loading = true;
        },
        [searchProduct.fulfilled.type]: (state, action) => {
            // 使用action的payload更新状态state
            state.data = action.payload.data; //action.payload带来的就是api的返回数据
            state.pagination = action.payload.pagination;
            state.loading = false;
            state.error = null;
        },
        [searchProduct.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            const add = action.payload;
            state.loading = false;
            state.error = action.payload;
        },
    },
});
