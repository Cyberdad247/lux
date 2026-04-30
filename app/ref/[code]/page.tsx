import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createHash } from "crypto";
import { supabaseServer } from "@/lib/supabase-server";

interface RefPageProps {
  params: { code: string };
}

async function logReferral(code: string) {
  const reqHeaders = headers();
  const ua = reqHeaders.get("user-agent")?.slice(0, 200) ?? null;
  const ip =
    reqHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ref_ip_hash = createHash("sha256")
    .update(ip)
    .digest("hex")
    .slice(0, 16);

  if (supabaseServer) {
    const { error } = await supabaseServer
      .from("referrals")
      .insert({ code, ts: new Date().toISOString(), ua, ref_ip_hash });
    if (error) console.error("[LUXORA_REF] Supabase error:", error.message);
  } else {
    console.log(`[LUXORA_REF] code=${code} ts=${Date.now()}`);
  }
}

export default async function RefPage({ params }: RefPageProps) {
  const { code } = params;

  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(code)) {
    redirect("/");
  }

  await logReferral(code);

  redirect(`/apply?ref=${encodeURIComponent(code)}`);
}

export const dynamic = "force-dynamic";
