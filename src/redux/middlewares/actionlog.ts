import { Middleware } from "redux";
// 实现action和state数据的打印功能
// actionlog的类型是middleware
export const actionLog: Middleware = (store) => (next) => (action) => {
    // console.log("state 当前: ", store.getState());
    // console.log("action: ", action);
    next(action); //next就是第二个嵌套函数传入的dispatch
    // 分发action 相当于dispatch 让reducer对state进行更改
    // console.log("statge 更新：", store.getState());
};
