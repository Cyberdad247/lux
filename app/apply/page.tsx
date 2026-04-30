import MerchantApplyForm from '@/components/MerchantApplyForm';

export const metadata = {
  title: 'Apply for Access — Luxora Payments',
  description: 'Sovereign merchant application for crypto payment acceptance.',
};

interface ApplyPageProps {
  searchParams?: { ref?: string };
}

export default function ApplyPage({ searchParams }: ApplyPageProps) {
  const refCode = searchParams?.ref ?? '';

  return (
    <main className="min-h-screen bg-[#0A0A0B] flex items-center justify-center py-20 px-4">
      <MerchantApplyForm refCode={refCode} />
    </main>
  );
}
