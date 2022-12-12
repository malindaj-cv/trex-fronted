import { useState } from "react";

export type AlertProps = {
    title?: string;
    message?: string;
    handleClose: () => void;
}

const ErrorAlert: React.FC<AlertProps> = (props: AlertProps) => {
    return (
        <div className="w-80 mx-5  overflow-y-auto">
            <div className="flex flex-col p-5 rounded-lg shadow bg-white">
                <div className="flex flex-col items-center text-center">
                    <div className="inline-block p-4 bg-yellow-50 rounded-full">
                        <svg className="w-12 h-12 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" /></svg>
                    </div>
                    <h2 className="mt-2 font-semibold text-gray-800">{props.title}</h2>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{props.message}</p>
                </div>

                <div className="flex items-center mt-3">

                    <button onClick={() => props.handleClose()} className="flex-1 px-4 py-2 ml-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-md">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorAlert;