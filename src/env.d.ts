/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string; // your custom env vars
  // DO NOT redeclare DEV, PROD, MODE
}

