import type { NextPage } from 'next';

const Home: NextPage = () => {

  return (
    <div className="container flex flex-col  items-center mt-10">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold text-violet-500 hover:text-violet-500 duration-200">T-REX</h1>
        <h2 className="text-2xl font-semibold text-violet-500 hover:text-violet-500 duration-200">Token Issuer</h2>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold text-violet-500 hover:text-violet-500 duration-200">T-REX</h1>
        <h2 className="text-2xl font-semibold text-violet-500 hover:text-violet-500 duration-200">Agent</h2>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold text-violet-500 hover:text-violet-500 duration-200">T-REX</h1>
        <h2 className="text-2xl font-semibold text-violet-500 hover:text-violet-500 duration-200">Claim Issuer</h2>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold text-violet-500 hover:text-violet-500 duration-200">T-REX</h1>
        <h2 className="text-2xl font-semibold text-violet-500 hover:text-violet-500 duration-200">Investors</h2>
      </div>
    </div>    
  );
}

export default Home;
