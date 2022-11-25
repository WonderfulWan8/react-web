import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START"; // 正在调用推荐信息api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
    "FETCH_RECOMMEND_PRODUCTS_SUCCESS"; // 推荐信息api调用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL = "FETCH_RECOMMEND_PRODUCTS_FAIL"; // 推荐信息api调用失败

// 正在调用推荐信息api
interface FetchRecommendProductStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}
// 推荐信息api调用成功
interface FetchRecommendProductSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
    payload: any; //api调用成功返回数据
}
// 推荐信息api调用失败
interface FetchRecommendProductFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
    payload: any; //api调用失败返回信息
}
// 输出action的总类型 在reducer中使用
export type RecommendProductAction =
    | FetchRecommendProductStartAction
    | FetchRecommendProductSuccessAction
    | FetchRecommendProductFailAction;

// 正在接受信息action creator
export const fetchRecommendProductStartActionCreator =
    (): FetchRecommendProductStartAction => {
        return { type: FETCH_RECOMMEND_PRODUCTS_START };
    };
// 推荐信息调用成功action creator
export const fetchRecommendProductSuccessActionCreator = (
    data
): FetchRecommendProductSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data,
    };
};
// api调用失败action creator
export const fetchRecommendProductFailActionCreator = (
    error
): FetchRecommendProductFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error,
    };
};

// 返回值类型是thunk action
// thunk可以返回一个函数，而不一定是js对象
// 在一个thunk action中可以完成一系列连续的action操作
// 并且可以异步处理逻辑
// 业务逻辑可以从ui层挪到这里 代码分层更加清晰

// 返回值是函数，函数的类型就是：thunkaction
// thunkaction的泛型有四个
// ReturnType 当前函数的返回值 要求定义最终的输出类型
// State 指的是store的state，要求输入state的类型
// ExtraThunkArg 定义action中额外的参数
// BasicAction Action的类型
export const giveMeDataActionCreator =
    (): ThunkAction<void, RootState, undefined, RecommendProductAction> =>
    async (dispatch, getState) => {
        dispatch(fetchRecommendProductStartActionCreator); //向store发送请求开始
        try {
            const { data } = await axios.get(
                "http://123.56.149.216:8080/api/productCollections"
            );
            dispatch(fetchRecommendProductSuccessActionCreator(data)); //如果请求成功则向stroe发送fetchsuccess的action
        } catch (error: any) {
            dispatch(fetchRecommendProductFailActionCreator(error.message)); //向store发送请求失败
        }
    };
