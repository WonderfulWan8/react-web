import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect } from "react";
import styles from "./SignInForm.module.css";
import { signIn } from "../../redux/user/slice";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { useHistory } from "react-router-dom";

export const SignInForm: React.FC = () => {
    const loading = useSelector((state) => state.user.loading);
    const jwt = useSelector((state) => state.user.token);
    const erroe = useSelector((state) => state.user.error);

    const dispatch = useDispatch();
    const history = useHistory();

    // 当jwt发生变化，触发useEffect函数 将页面重定向到主页
    useEffect(() => {
        if (jwt !== null) {
            history.push("/");
        }
    }, [jwt]);
    const onFinish = (values: any) => {
        // onFinish是antd表单的表单验证结束的回调函数
        console.log("Success:", values);
        dispatch(
            signIn({
                email: values.username,
                password: values.password,
            })
        );
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles["register-form"]}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: "Please input your username!" },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: "Please input your password!" },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
