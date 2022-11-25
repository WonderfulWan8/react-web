import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "../../redux/hooks"; //使用自定义的useSelector帮助从store中连接数据
import { useDispatch } from "react-redux";
import {
    addLanguageActionCreator,
    changeLanguageActionCreator,
} from "../../redux/language/languageActions";
import { useTranslation } from "react-i18next";
import jwt_decode, { JwtPayload as defaultJwtPayload } from "jwt-decode"; //jwt解码插件
import { userSlice } from "../../redux/user/slice";

interface JwtPayload extends defaultJwtPayload {
    // 自定义jwtpayload接口
    username: string;
}

export const Header: React.FC = () => {
    const history = useHistory();
    // 自定义useselectedhook 解决 state与 rootstate 耦合的问题
    const language = useSelector((state) => state.language.language);
    const languageList = useSelector((state) => state.language.languageList);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const jwt = useSelector((state) => state.user.token);
    const [username, setUsername] = useState("");

    const shoppingCartItems = useSelector((state) => state.shoppingCart.items);
    console.log("shoppingCartItems: ", shoppingCartItems);
    console.log("shoppingCartItems.length: ", shoppingCartItems.length);
    const shoppingCartLoading: any = useSelector(
        (state) => state.shoppingCart.loading
    );

    useEffect(() => {
        // 如果jwt发生变化就触发useEffect函数
        if (jwt) {
            // 如果jwt不为空，就使用jwt_decode解码，泛型为JwtPayload，参数为jwt
            const token = jwt_decode<JwtPayload>(jwt);
            setUsername(token.username); //将登录成功返回的token解码并赋值给username
        }
    }, [jwt]);

    // 语言点击逻辑
    const menuClickHandler = (e) => {
        // console.log("e: ", e);
        if (e.key === "new") {
            dispatch(addLanguageActionCreator("新语言", "new_lang"));
        } else {
            dispatch(changeLanguageActionCreator(e.key));
        }
    };

    // 登出逻辑
    const onLogout = () => {
        // 清除
        dispatch(userSlice.actions.logOut());
        history.push("/"); //用户可能在任一页面登出，所以需要重定向到主页
    };

    return (
        <div className={styles["app-header"]}>
            {/* top-header */}
            <div className={styles["top-header"]}>
                <div className={styles.inner}>
                    <Typography.Text>{t("header.slogan")}</Typography.Text>
                    <Dropdown.Button
                        style={{ marginLeft: 15 }}
                        overlay={
                            <Menu onClick={menuClickHandler}>
                                {languageList.map((l) => {
                                    return (
                                        <Menu.Item key={l.code}>
                                            {l.name}
                                        </Menu.Item>
                                    );
                                })}
                                <Menu.Item key={"new"}>
                                    {t("header.add_new_language")}
                                </Menu.Item>
                            </Menu>
                        }
                        icon={<GlobalOutlined />}
                    >
                        {language === "zh" ? "中文" : "English"}
                    </Dropdown.Button>
                    {
                        // 用户已经登录时展示购物车和登出按钮
                        // 未登录时展示注册和登录按钮
                        jwt ? (
                            <Button.Group className={styles["botton-group"]}>
                                <span>
                                    {t("header.welcome")}
                                    {username}
                                </span>
                                <Button
                                    loading={shoppingCartLoading}
                                    onClick={() =>
                                        history.push("/shoppingCart")
                                    }
                                >
                                    {t("header.shoppingCart")}({" "}
                                    {shoppingCartItems.length})
                                </Button>
                                <Button onClick={onLogout}>
                                    {t("header.signOut")}
                                </Button>
                            </Button.Group>
                        ) : (
                            <Button.Group className={styles["botton-group"]}>
                                <Button
                                    onClick={() => history.push("/register")}
                                >
                                    {t("header.register")}
                                </Button>
                                <Button onClick={() => history.push("/signIn")}>
                                    {t("header.signin")}
                                </Button>
                            </Button.Group>
                        )
                    }
                </div>
            </div>
            <Layout.Header className={styles["main-header"]}>
                <span onClick={() => history.push("/")}>
                    <img src={logo} alt="logo" className={styles["App-logo"]} />
                    <Typography.Title level={3} className={styles.title}>
                        {t("header.title")}
                    </Typography.Title>
                </span>

                <Input.Search
                    className={styles["search-input"]}
                    placeholder={"请输入旅游目的地、主题、或关键字"}
                    onSearch={(keywords) => history.push("/search/" + keywords)}
                />
            </Layout.Header>
            <Menu mode={"horizontal"} className={styles["main-menu"]}>
                <Menu.Item key="1">{t("header.home_page")}</Menu.Item>
                <Menu.Item key="2">{t("header.weekend")}</Menu.Item>
                <Menu.Item key="3">{t("header.group")}</Menu.Item>
                <Menu.Item key="4">{t("header.backpack")}</Menu.Item>
                <Menu.Item key="5">{t("header.private")}</Menu.Item>
                <Menu.Item key="6">{t("header.cruise")}</Menu.Item>
                <Menu.Item key="7">{t("header.hotel")}</Menu.Item>
                <Menu.Item key="8">{t("header.local")}</Menu.Item>
                <Menu.Item key="9">{t("header.theme")}</Menu.Item>
                <Menu.Item key="10">{t("header.custom")}</Menu.Item>
                <Menu.Item key="11">{t("header.study")}</Menu.Item>
                <Menu.Item key="12">{t("header.visa")}</Menu.Item>
                <Menu.Item key="13">{t("header.enterprise")}</Menu.Item>
                <Menu.Item key="14">{t("header.high_end")}</Menu.Item>
                <Menu.Item key="15">{t("header.outdoor")}</Menu.Item>
                <Menu.Item key="16">{t("header.insurance")}</Menu.Item>
            </Menu>
        </div>
    );
};
