import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { supabaseServer } from '@/lib/supabase-server';

interface ApplyPayload {
  businessName: string;
  businessType: string;
  email: string;
  monthlyVolume: string;
  refCode?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ApplyPayload = await req.json();
    const { businessName, businessType, email, monthlyVolume, refCode } = body;

    // Basic validation
    if (!businessName?.trim() || !email?.trim() || !businessType || !monthlyVolume) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const ipHash = createHash('sha256').update(ip).digest('hex').slice(0, 16);

    const record = {
      business_name: businessName.trim(),
      business_type: businessType,
      email: email.trim().toLowerCase(),
      monthly_volume: monthlyVolume,
      ref_code: refCode?.trim() || null,
      ip_hash: ipHash,
      ua: req.headers.get('user-agent')?.slice(0, 200) ?? null,
      created_at: new Date().toISOString(),
    };

    if (supabaseServer) {
      const { error } = await supabaseServer
        .from('merchants_pending')
        .insert(record);

      if (error) {
        console.error('[LUXORA_APPLY] Supabase error:', error.message);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
      }
    } else {
      // Supabase not configured — log and accept gracefully
      console.log('[LUXORA_APPLY]', JSON.stringify(record));
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('[LUXORA_APPLY] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
