const Footer: React.FC = () => {
    return (
        <footer className="w-full relative bg-blueGray-200 pt-8 pb-6">
            <div className="container mx-auto px-1">
                <hr className="my-6 border-blueGray-300" />
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm text-blueGray-500 font-semibold py-1">
                            Copyright © <span id="get-current-year">2022</span><a href="" className="text-blueGray-500 hover:text-gray-800" target="_blank"> T-REX</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;