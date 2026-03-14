import createFetchClient from "openapi-fetch";
import type { paths } from "./schema.ts";

export type { components, paths } from "./schema.ts";

export interface APIClientOptions {
  /** Bearer token — Firebase ID token (`Authorization: Bearer <token>`) or long-lived API key (`sk_live_*`) */
  token: string;
  /** Override the base URL. Defaults to the production API. */
  baseUrl?: string;
}

/**
 * Creates a type-safe API client.
 *
 * @example
 * ```ts
 * import { createClient } from "@acme/sdk";
 *
 * const api = createClient({ token: firebaseIdToken });
 *
 * const { data, error } = await api.GET("/qr-codes", {
 *   params: { query: { page: 1, limit: 20 } },
 * });
 * ```
 */
export function createClient({
  token,
  baseUrl = "https://api.example.com/v1",
}: APIClientOptions) {
  return createFetchClient<paths>({
    baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}