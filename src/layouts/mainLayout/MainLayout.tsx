import React from "react";
import styles from "./MainLayout.module.css";
import { Header, Footer } from "../../components";

interface PropsType {}

// children 是每一个react组件自带的props属性
//以html内嵌元素的形式通过children字段传递渲染数据
export const MainLayout: React.FC = ({ children }) => {
    return (
        <>
            <Header />
            <div className={styles["page-content"]}>{children}</div>
            <Footer />
        </>
    );
};
