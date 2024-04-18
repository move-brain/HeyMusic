import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
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
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.join(__dirname, "./src"),
        },
    },
});
