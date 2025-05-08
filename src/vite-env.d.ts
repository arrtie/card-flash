/** @format */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANTHROPIC_API_KEY: string;
  readonly VITE_PAGE_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
