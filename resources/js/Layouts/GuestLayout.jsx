import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ title, children }) {
    return (
        <>
            {/*  <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div> */}
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                     <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {title}
                    </h2>
                   
                </div>
                
                {children}
            </div>
        </>
    );
}
