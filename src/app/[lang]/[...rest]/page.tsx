import { notFound } from "next/navigation";

// A nested not-found.tsx only fires when a route throws notFound(). Without
// this catch-all, unknown paths fall through to Next's built-in 404, which is
// unstyled and English-only.
export default function CatchAll() {
  notFound();
}
