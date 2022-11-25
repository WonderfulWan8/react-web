export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language";

interface ChangeLanguageAction {
    //改变语言类型接口
    type: typeof CHANGE_LANGUAGE;
    payload: "zh" | "en";
}

interface AddLanguageAction {
    //创建新语言接口
    type: typeof ADD_LANGUAGE;
    payload: { name: string; code: string };
}

export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

// 使用工厂 创建action
export const changeLanguageActionCreator = (
    languageCode: "zh" | "en"
): ChangeLanguageAction => {
    return {
        type: CHANGE_LANGUAGE,
        payload: languageCode,
    };
};

// 语言添加action 参数 新语言，新语言对应的字符串代码
export const addLanguageActionCreator = (
    name: string,
    code: string
): AddLanguageAction => {
    return {
        type: ADD_LANGUAGE,
        payload: { name, code },
    };
};
