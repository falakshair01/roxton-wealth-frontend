'use client';

type TabButtonProps = {
  loading: boolean;
  onClick: (activeTab: string) => void;
  activeClient: string;
};

export function TabButton({ loading, onClick, activeClient }: TabButtonProps) {
  return (
    <div className='mb-2 grid grid-cols-1 md:grid-cols-2'>
      {/* "Client 1" button like an input */}
      <div>
        <button
          type='button'
          onClick={() => onClick('client1')}
          disabled={loading}
          className={[
            'text-md h-11 w-full rounded-tl-md rounded-bl-md border px-3 text-center font-bold',
            'transition focus:outline-none',
            activeClient === 'client1'
              ? 'border-primary bg-primary text-white'
              : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
          ].join(' ')}
        >
          Client 1
        </button>
      </div>

      {/* "Client 2" button like an input */}
      <div>
        <button
          type='button'
          onClick={() => onClick('client2')}
          disabled={loading}
          className={[
            'text-md h-11 w-full rounded-tr-md rounded-br-md border px-3 text-center font-bold',
            'transition focus:outline-none',
            activeClient === 'client2'
              ? 'border-primary bg-primary text-white'
              : 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50'
          ].join(' ')}
        >
          Client 2
        </button>
      </div>
    </div>
  );
}
