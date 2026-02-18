import config from "@/config";
import {
  createSIWEConfig,
  formatMessage,
  SIWECreateMessageArgs,
} from "@reown/appkit-siwe";

const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";

export const siweConfig = createSIWEConfig({
  getMessageParams: async () => ({
    domain: typeof window !== "undefined" ? window.location.host : "",
    uri: typeof window !== "undefined" ? window.location.origin : "",
    chains: config.chains.map((c) => c.id),
    statement: "Sign in to LCAI DAO to manage your delegate profile.",
  }),
  createMessage: ({ address, ...args }: SIWECreateMessageArgs) =>
    formatMessage(args, address),
  getNonce: async () => {
    const res = await fetch(`${API_ENDPOINT}/api/auth/nonce`);
    const data = await res.json();
    return data.nonce;
  },
  verifyMessage: async ({ message, signature }) => {
    const res = await fetch(`${API_ENDPOINT}/api/auth/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, signature }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    if (data.token) {
      sessionStorage.setItem("siwe-token", data.token);
    }
    return true;
  },
  getSession: async () => {
    const token = sessionStorage.getItem("siwe-token");
    if (!token) return null;

    try {
      const res = await fetch(`${API_ENDPOINT}/api/auth/session`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        sessionStorage.removeItem("siwe-token");
        return null;
      }
      const data = await res.json();
      return {
        address: data.address,
        chainId: config.chains[0].id,
      };
    } catch {
      return null;
    }
  },
  signOut: async () => {
    sessionStorage.removeItem("siwe-token");
    return true;
  },
});
