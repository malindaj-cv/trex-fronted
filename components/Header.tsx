import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNetwork } from "wagmi";

const Header: React.FC = () => {
    const { chain: network } = useNetwork();
    return (
        <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
            <h1 className="w-3/12">
                <a href="">
                   <div className="flex items-center">
                        <img className="h-20 w-auto hover:text-green-500 duration-200" src="https://raw.githubusercontent.com/TokenySolutions/T-REX/main/docs/img/T-REX.png" alt="" />
                        <h1 className="text-4xl font-semibold text-violet-500 hover:text-violet-500 duration-200">T-REX</h1>
                   </div>
                </a>
            </h1>
            <nav className="nav font-semibold text-lg">
                <ul className="flex items-center">
                    <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
                        <a href="">Token Issuer</a>
                    </li>
                    <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                        <a href="/agent">Agent</a>
                    </li>
                    <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                        <a href="">Claim Issuer</a>
                    </li>
                    <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                        <a href="">Investors</a>
                    </li>
                </ul>
            </nav>
            <div className="w-3/12 flex justify-end">
                <ConnectButton />
            </div>
        </header>
    );
};

export default Header;