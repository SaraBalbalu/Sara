import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base = nom du repo GitHub, car le site est servi sur
// https://sarabalbalu.github.io/Sara/
export default defineConfig({
  plugins: [react()],
  base: "/Sara/",
});
