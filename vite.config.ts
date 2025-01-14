import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
// import { splitVendorChunkPlugin } from "vite";
import importToCDN from "vite-plugin-cdn-import";
import path from "path";
export default defineConfig({
    envDir: "./env",
    optimizeDeps: {
        exclude: [], //将指定数组中的依赖不进行依赖预构建
    },
    css: {
        modules: {},
        preprocessorOptions: {
            scss: {},
        },
    },
    resolve: {
        alias: {
            "@": path.join(__dirname, "./src"),
        },
    },
    plugins: [
        viteCompression({
            threshold: 102400,
        }),
        // splitVendorChunkPlugin(),
        // importToCDN({
        //     modules: [
        //         {
        //             name: "lodash",
        //             var: "_",
        //             path: "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js",
        //         },
        //     ],
        // }),
    ],
    build: {
        assetsInlineLimit: 4096,
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                chunkFileNames: "assets/DynamicRoute/[name]-[hash].js",
                manualChunks: (path: string) => {
                    if (path.includes("node_modules")) {
                        return path
                            .toString()
                            .split("node_modules/")[1]
                            .split("/")[0]
                            .toString();
                    }
                },
            },
            // 手动指定要分割的模块
            // external: [
            //     "react",
            //     "axios",
            //     "react-redux",
            //     "react-router-dom",
            //     "classnames",
            // ],
        },
        terserOptions: {
            compress: {
                //生产环境时移除console
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "https://api.izxl.asia",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
