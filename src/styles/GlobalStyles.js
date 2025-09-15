import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; background:#f6f7f9; color:#222; }
  main { max-width: 960px; margin: 24px auto; padding: 0 16px; }
  input, textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; }
  button { padding: 10px 16px; border: 0; border-radius: 8px; cursor: pointer; }
  .card { background:#fff; border:1px solid #eee; border-radius:12px; padding:16px; }
`;
export default GlobalStyle;