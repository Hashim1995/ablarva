import { Chip } from '@nextui-org/react';

function Home() {
  return (
    <div>
      <div
        style={{
          height: '50vh',
          padding: '5rem',
          background: 'white'
        }}
      >
        Home Page
        <Chip>Chip</Chip>
      </div>
    </div>
  );
}

export default Home;
