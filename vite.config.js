import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/pvgis-api': {
                target: 'https://re.jrc.ec.europa.eu',
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/pvgis-api/, ''); },
            },
        },
    },
});
