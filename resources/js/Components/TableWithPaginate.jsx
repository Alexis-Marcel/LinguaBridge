import {Link} from "@inertiajs/react";
import {ArrowLongLeftIcon, ArrowLongRightIcon} from "@heroicons/react/20/solid/index.js";
import {classNames} from "@/Utils/classNames.js";

export default function TableWithPaginate({sessions, formatData, data}) {
    return <>
        <section className="px-4 sm:px-6 lg:px-8 mb-8">
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            {sessions.data.length !==0 ? (
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
{formatData.map((format, index) => (
    <th key={index} scope="col" className={classNames('py-3.5 text-left text-sm font-semibold text-gray-900', index === 0 ? 'pl-4 pr-3 sm:pl-0' : 'px-3')}>
        {format.name}
    </th>
))}


                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                               {/* {sessions.data.map((session) => (
                                    <tr key={session.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{session.session_title}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.level}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.date}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.language1.name}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.language2.name}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session.host.name}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                Edit<span className="sr-only">, {"Test"}</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}*/}
                               {sessions.data.map((session) => (
                                   <tr key={session.id}>
                                       {formatData.map((value, index) => (
                                             <td key={index}
                                                 className={classNames('whitespace-nowrap', index === 0 ? 'py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0' : 'px-3 py-4 text-gray-500')}>
                                                    {value.keys.reduce((acc, key) => acc[key], session)}
                                                </td>
                                        ))}
                                   </tr>
                               ))}

                                </tbody>
                            </table>
                            ) : <div className="text-center text-gray-500">No data found</div>}
                        </div>
                    </div>
            </div>
        </section>
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        <div className="-mt-px flex w-0 flex-1">
            <Link
                href={sessions.prev_page_url}
                className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
                <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                Previous
            </Link>
        </div>
        <div className="hidden md:-mt-px md:flex">
            {Array.from({length: sessions.last_page}, (_, i) => i + 1).map((page) => (
                <Link
                    key={page}
                    href={sessions.links[page].url}
                    className={classNames(
                        page === sessions.current_page ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium'
                    )}
                >
                    {page}
                </Link>
            ))}
        </div>
        <div className="-mt-px flex w-0 flex-1 justify-end">
            <Link
                href={sessions.next_page_url}
                className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
                Next
                <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
            </Link>
        </div>
    </nav>

</>
}
