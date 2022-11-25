# 第一个阶段：拉取node镜像来打包react项目
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY public public/
COPY src src/
RUN npm run build

# 第二个阶段：创建并运行Ngnix服务器，并且把打包和的文件复制粘贴到服务器文件夹中
FROM nginx:alpine
COPY --FROM=build /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]