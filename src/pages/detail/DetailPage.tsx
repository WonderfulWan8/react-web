import styles from "./DetailPage.module.css";
import axios from "axios";
import {
    Spin,
    Row,
    Col,
    DatePicker,
    Divider,
    Typography,
    Anchor,
    Menu,
    Button,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";
import {
    Header,
    Footer,
    ProductIntro,
    ProductComments,
} from "../../components";
import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom"; //props定义的接口
import { commentMockData } from "./mockup";
import {
    ProductDetailSlice,
    getProductDetail,
} from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
// useParams取得 url中的参数
import { MainLayout } from "../../layouts/mainLayout";
interface MatchParams {
    touristRouteId: string;
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = () => {
    const { touristRouteId } = useParams<MatchParams>();
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);
    // const [product, setProduct] = useState<any>(null);
    const { RangePicker } = DatePicker;

    const loading = useSelector((state) => state.productDetail.loading);
    const error = useSelector((state) => state.productDetail.error);
    const product = useSelector((state) => state.productDetail.data);

    const dispatch = useDispatch();

    const jwt: any = useSelector((state) => state.user.token);
    const shoppingCartLoading: any = useSelector(
        (state) => state.shoppingCart.loading
    );

    // useEffect 第二个参数传入空数组[] 页面初始化数据只会调用一次
    useEffect(() => {
        dispatch(getProductDetail(touristRouteId));
    }, []);

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
            {/* 产品简介 与 日期选择 */}
            <div className={styles["product-intro-container"]}>
                <Row>
                    <Col span={13}>
                        <ProductIntro
                            title={product.title}
                            shortDescription={product.description}
                            price={product.originalPrice}
                            coupons={product.coupons}
                            points={product.points}
                            discount={product.price}
                            rating={product.rating}
                            pictures={product.touristRoutePictures.map(
                                (p: any) => p.url
                            )}
                        />
                    </Col>
                    <Col span={11}>
                        <Button
                            style={{
                                marginTop: 50,
                                marginBottom: 30,
                                display: "block",
                            }}
                            type="primary"
                            danger
                            loading={shoppingCartLoading}
                            onClick={() => {
                                dispatch(
                                    addShoppingCartItem({
                                        jwt,
                                        touristRouteId: product.id,
                                    })
                                );
                            }}
                        >
                            <ShoppingCartOutlined />
                            放入购物车
                        </Button>
                        <RangePicker open style={{ marginTop: 20 }} />
                    </Col>
                </Row>
            </div>
            {/* 锚点菜单 */}
            <Anchor className={styles["product-detail-anchor"]}>
                <Menu mode="horizontal">
                    <Menu.Item key="1">
                        <Anchor.Link
                            href="#feature"
                            title="产品特色"
                        ></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Anchor.Link href="#fees" title="费用"></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Anchor.Link
                            href="#notes"
                            title="预定须知"
                        ></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Anchor.Link
                            href="#comments"
                            title="用户评价"
                        ></Anchor.Link>
                    </Menu.Item>
                </Menu>
            </Anchor>
            {/* 产品特色 */}
            <div id="feature" className={styles["product-detail-container"]}>
                <Divider orientation={"center"}>
                    <Typography.Title level={3}>产品特色</Typography.Title>
                </Divider>
                <div
                    dangerouslySetInnerHTML={{ __html: product.features }}
                    style={{ margin: 50 }}
                ></div>
            </div>
            {/* 产品费用 */}
            <div id="fees" className={styles["product-detail-container"]}>
                <Divider orientation={"center"}>
                    <Typography.Title level={3}>费用</Typography.Title>
                </Divider>
                <div
                    dangerouslySetInnerHTML={{ __html: product.fees }}
                    style={{ margin: 50 }}
                ></div>
            </div>
            {/* 预定须知 */}
            <div id="notes" className={styles["product-detail-container"]}>
                <Divider orientation={"center"}>
                    <Typography.Title level={3}>预定须知</Typography.Title>
                </Divider>
                <div
                    dangerouslySetInnerHTML={{ __html: product.notes }}
                    style={{ margin: 50 }}
                ></div>
            </div>
            {/* 商品评价 */}
            <div id="comments" className={styles["product-detail-container"]}>
                <Divider orientation={"center"}>
                    <Typography.Title level={3}>用户评价</Typography.Title>
                </Divider>
                <div style={{ margin: 40 }}>
                    <ProductComments data={commentMockData} />
                </div>
            </div>
        </MainLayout>
    );
};
