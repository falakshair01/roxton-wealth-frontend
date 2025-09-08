import PageContainer from '@/components/layout/page-container';
import UpdateClientContent from './UpdateClientContent';
import { MOCK_CLIENTS_DETAIL } from '@/constants/mock-clients-detail';

export const metadata = {
  title: 'Dashboard: Update Client'
};

type Params = { id: string };
type Search = Record<string, string | string[] | undefined>;

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<Params>;
  searchParams?: Promise<Search>;
}) {
  const { id: clientId } = await params;

  const clientData = MOCK_CLIENTS_DETAIL.find(
    (client) => client.id === clientId
  );

  if (!clientData) {
    return (
      <PageContainer scrollable={false}>
        <div className='flex flex-1 flex-col space-y-2'>
          <p>Client not found</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-2'>
        {/* ✅ Pass data as prop */}
        <UpdateClientContent data={clientData} />
      </div>
    </PageContainer>
  );
}
