import React from "react";
import { Comment, Tooltip, List } from "antd";
import styles from "./ProductComments.module.css";

interface PropsType {
    data: {
        author: string;
        avatar: string; //头像
        content: string; //评论内容
        createDate: string;
    }[];
}

export const ProductComments: React.FC<PropsType> = ({ data }) => {
    return (
        <List
            dataSource={data}
            itemLayout="horizontal"
            renderItem={(item) => {
                return (
                    <li>
                        <Comment
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.createDate}
                        />
                    </li>
                );
            }}
        ></List>
    );
};
