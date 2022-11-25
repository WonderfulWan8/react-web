import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ShoppingCartState {
    loading: boolean;
    error: string | null;
    items: any[];
}

const initialState: ShoppingCartState = {
    loading: true,
    error: null,
    items: [],
};

// 获取购物车
export const getShoppingCart = createAsyncThunk(
    "shoppingCart/getShoppingCart",
    async (jwt: string, thunkAPI) => {
        let url = "http://123.56.149.216:8080/api/shoppingCart";
        const { data }: any = await axios.get(url, {
            headers: {
                Authorization: `bearer ${jwt}`,
            },
        });
        console.log("data: ", data);
        // return data.shoppingCartItems;//会报错 shoppingCartItems.length为 undefined 因为数据结构不一样
        return data.shoppingCartItems;
    }
);

// 添加商品至购物车
export const addShoppingCartItem = createAsyncThunk(
    "shoppingCart/addShoppingCartItem",
    async (parameters: { jwt: string; touristRouteId: string }, thunkAPI) => {
        let url = "http://123.56.149.216:8080/api/shoppingCart/items";
        const { data }: any = await axios.post(
            url,
            {
                touristRouteId: parameters.touristRouteId,
            },
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`,
                },
            }
        );
        return data.shoppingCartItems;
    }
);

// 下单支付
export const checkout = createAsyncThunk(
    "shoppingCart/checkout",
    async (jwt: string, thunkAPI) => {
        const { data } = await axios.post(
            "http://123.56.149.216:8080/api/shoppingCart/checkout",
            null, //不需要主体
            {
                headers: {
                    Authorization: `bearer ${jwt}`,
                },
            }
        );
        return data;
    }
);

// 清空购物车
export const clearShoppingCartItem = createAsyncThunk(
    "shoppingCart/clearShoppingCartItem",
    async (parameters: { jwt: string; itemIds: number[] }) => {
        return await axios.delete(
            `http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(
                ","
            )})`,
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`,
                },
            }
        );
    }
);

export const ShoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: {
        // 获取购物车
        [getShoppingCart.pending.type]: (state) => {
            state.loading = true;
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            console.log("state: ", state);
            console.log("action: ", action);
            state.items = action.payload;
            state.loading = false;
            state.error = null;
            console.log("state: ", state.items);
            console.log("action: ", action);
        },
        [getShoppingCart.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        },

        // 添加商品至购物车
        [addShoppingCartItem.pending.type]: (state) => {
            state.loading = true;
        },
        [addShoppingCartItem.fulfilled.type]: (state, action) => {
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        [addShoppingCartItem.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        },

        // 清空购物车
        [clearShoppingCartItem.pending.type]: (state) => {
            state.loading = true;
        },
        [clearShoppingCartItem.fulfilled.type]: (state, action) => {
            state.items = []; //清空购物车
            state.loading = false;
            state.error = null;
        },
        [clearShoppingCartItem.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        },

        //下单支付
        [checkout.pending.type]: (state) => {
            state.loading = true;
        },
        [checkout.fulfilled.type]: (state, action) => {
            state.items = []; //下单成功后 清空购物车
            state.loading = false;
            state.error = null;
        },
        [checkout.rejected.type]: (
            state,
            action: PayloadAction<string | null>
        ) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});
