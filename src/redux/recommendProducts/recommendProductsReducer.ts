import {
    FETCH_RECOMMEND_PRODUCTS_FAIL,
    FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    FETCH_RECOMMEND_PRODUCTS_START,
    RecommendProductAction,
} from "./recommendProductsAction";

// 产品推荐数据接口
interface RecommendProductsState {
    productList: any[];
    loading: boolean;
    error: string | null;
}
const defaultState: RecommendProductsState = {
    loading: true,
    error: null,
    productList: [],
};
export default (state = defaultState, action: RecommendProductAction) => {
    switch (
        action.type //判断传入的action类型
    ) {
        case FETCH_RECOMMEND_PRODUCTS_START: //请求开始 开始loading
            return { ...state, loading: true };
        case FETCH_RECOMMEND_PRODUCTS_SUCCESS: //请求成功 loading结束 修改productlist数据
            //获取数据成功，state旧数据结构，loading置为false，productList设置为新值
            return { ...state, loading: false, productList: action.payload };
        case FETCH_RECOMMEND_PRODUCTS_FAIL: //请求失败 loading结束
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
