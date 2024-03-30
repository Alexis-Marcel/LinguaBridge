import {Link} from "@inertiajs/react";
import {ArrowLongLeftIcon, ArrowLongRightIcon} from "@heroicons/react/20/solid/index.js";
import {classNames} from "@/Utils/classNames.js";
import Paginate from "@/Components/Paginate.jsx";

export default function TableWithPaginate({sessions, formatData, onRowClick}) {
    return <>
        <section className="px-4 sm:px-6 lg:px-8 mb-8">
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        {sessions.data.length !== 0 ? (
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-900 pl-4 pr-3 sm:pl-0">
                                        Session Title
                                    </th>
                                    {formatData.map((format, index) => (
                                        <th key={index} scope="col"
                                            className={classNames('py-3.5 text-left text-sm font-semibold text-gray-900', index === 0 ? 'pl-4 pr-3 sm:pl-0' : 'px-3')}>
                                            {format.name}
                                        </th>
                                    ))}
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
                                    <tr key={session.id} className="hover:bg-gray-50"
                                        onClick={() => onRowClick(session)}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="flex items-center">
                                                <div className="h-11 w-11 flex-shrink-0">
                                                    <img className="h-11 w-11 rounded-full" src={session.cover_photo} alt=""/>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900">{session.session_title}</div>
                                                </div>
                                            </div>
                                        </td>
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
        {/* Pagination */}
        <Paginate pageData={sessions}/>
    </>
}
