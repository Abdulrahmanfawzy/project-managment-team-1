/**
 * TEMPORARY dev auth token — remove once the real sign-in flow stores a token.
 *
 * The value lives in `.env` as VITE_DEV_TOKEN (gitignored) so the token is
 * never committed. Paste your Bearer token there, then restart `yarn dev`.
 */
export const DEV_TOKEN: string = import.meta.env.VITE_DEV_TOKEN ?? "";
