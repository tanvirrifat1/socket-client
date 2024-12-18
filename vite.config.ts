import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "192.168.12.206", // Bind to this IP address
    port: 3000, // Specify the port (default is 5173)
  },
});
