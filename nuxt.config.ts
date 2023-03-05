// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "dark",
  },
  vite: {
    clearScreen: false,
    server: {
      strictPort: true,
    },
    envPrefix: ["VITE_", "TAURI_"],
    build: {
      target:
        process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
      minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
      sourcemap: !!process.env.TAURI_DEBUG,
    },
  },
});
