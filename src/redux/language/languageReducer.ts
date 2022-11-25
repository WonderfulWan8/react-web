import i18n from "i18next";
import {
    CHANGE_LANGUAGE,
    ADD_LANGUAGE,
    LanguageActionTypes,
} from "./languageActions";

export interface LanguageState {
    language: "en" | "zh";
    languageList: { name: string; code: string }[]; //语言列表
}
const defaultState: LanguageState = {
    language: "zh",
    languageList: [
        {
            name: "中文",
            code: "zh",
        },
        {
            name: "英文",
            code: "en",
        },
    ],
};
export default (state = defaultState, action: LanguageActionTypes) => {
    // console.log("state: ", state); //旧数据
    // console.log("action: ", action); //新数据
    // 任何store所保存的数据是immutable（不可更改的）
    // 如果需要数据的变化，需要使用一个新的对象，
    // 并且用新的对象代替原有的数据，同时销毁过去的数据
    //使用参数传入的旧数据 通过action的指令对数据做出处理，然后输出新的数据
    switch (action.type) {
        case CHANGE_LANGUAGE:
            i18n.changeLanguage(action.payload); //改变语言配置文件
            return { ...state, language: action.payload };
        case ADD_LANGUAGE:
            return {
                ...state,
                languageList: [...state.languageList, action.payload],
            };
        default:
            return state;
    }
};
