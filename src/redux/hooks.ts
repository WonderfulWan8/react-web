import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from "react-redux";
import { RootState } from "./store";
// 新创建一个useSelector 泛型为自己定义的RootState
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
