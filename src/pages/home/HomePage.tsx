import React from "react";
import styles from "./HomePage.module.css";
import {
    Header,
    Footer,
    Carousel,
    SideMenu,
    ProductCollection,
    BusinessPartners,
} from "../../components";
import { Row, Col } from "antd";
import { Typography, Spin } from "antd";
import sideImage1 from "../../assets/images/sider_2019_12-09.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_02-04-2.png";
import { withTranslation, WithTranslation } from "react-i18next";
import axios from "axios";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import { giveMeDataActionCreator } from "../../redux/recommendProducts/recommendProductsAction";
import { MainLayout } from "../../layouts/mainLayout";

// redux store 和 dispatch的映射 连接函数
// 此函数映射state
const mapStateToProps = (state: RootState) => {
    return {
        loading: state.recommendProducts.loading,
        error: state.recommendProducts.error,
        productList: state.recommendProducts.productList,
    };
};
// 此函数映射dispatch
const mapDispatchToProps = (dispatch) => {
    return {
        // 将api请求放到redux中，这样其他页面访问时，不用重新写请求和处理逻辑
        giveMeData: () => {
            dispatch(giveMeDataActionCreator());
        },
    };
};

type PropsType = WithTranslation &
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

class HomePageComponents extends React.Component<PropsType> {
    // 主页只需要向store中dispatch一个action，
    // 就可以拿到对应的请求数据在jsx代码中渲染
    componentDidMount() {
        this.props.giveMeData(); //给我数据
    }
    render() {
        const { t, productList, loading, error } = this.props;
        if (loading) {
            //loading
            return (
                <Spin
                    size="large"
                    style={{
                        marginTop: 200,
                        marginBottom: 200,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                    }}
                ></Spin>
            );
        }
        if (error) {
            //error
            return <div>网站出错:{error}</div>;
        }
        return (
            <MainLayout>
                <Row style={{ marginTop: 20 }}>
                    <Col span={6}>
                        <SideMenu />
                    </Col>
                    <Col span={18}>
                        <Carousel />
                    </Col>
                </Row>
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="warning">
                            {t("home_page.hot_recommended")}
                        </Typography.Title>
                    }
                    sideImage={sideImage1}
                    products={productList[0].touristRoutes}
                ></ProductCollection>
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="danger">
                            {t("home_page.new_arrival")}
                        </Typography.Title>
                    }
                    sideImage={sideImage2}
                    products={productList[1].touristRoutes}
                ></ProductCollection>
                <ProductCollection
                    title={
                        <Typography.Title level={3} type="success">
                            {t("home_page.domestic_travel")}
                        </Typography.Title>
                    }
                    sideImage={sideImage3}
                    products={productList[2].touristRoutes}
                ></ProductCollection>
                <BusinessPartners></BusinessPartners>
            </MainLayout>
        );
    }
}
// 连接组件与redux-store 第一个()表示组件的映射数据，
// 第二个()放入组件
export const HomePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(HomePageComponents));
