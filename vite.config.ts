import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// import process from 'process';

// const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
    server: {
        port: 4000,
        proxy:{
            "/api": { 
                   target: "http://localhost:3000",
                //你的需要请求的服务器地址
                   changeOrigin: true, // 允许跨域
                 secure: false,  //忽略安全证书   
                   rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径把路径变成空字符,
            },
        },
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.join(__dirname, "./src"),
        }
    }
})

