import { redirect } from "next/navigation";

interface RefPageProps {
  params: { code: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Atomic referral log — server-side, no client exposure
async function logReferral(code: string) {
  // Stub: write to PROVENANCE_LEDGER or Supabase in Phase 2
  console.log(`[LUXORA_REF] code=${code} ts=${Date.now()}`);
}

export default async function RefPage({ params }: RefPageProps) {
  const { code } = params;

  // Validate: alphanumeric codes only (anti-injection)
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(code)) {
    redirect("/");
  }

  await logReferral(code);

  // Instant redirect back to landing with ref param preserved
  redirect(`/?ref=${encodeURIComponent(code)}`);
}

// Force dynamic — referral codes must never be cached
export const dynamic = "force-dynamic";
