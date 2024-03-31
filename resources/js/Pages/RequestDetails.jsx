import {Head, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {classNames} from "@/Utils/classNames.js";
import {CheckIcon, XMarkIcon} from "@heroicons/react/20/solid";


export default function RequestDetails({auth, session, requestsAccepted, requestsPending, requestsRejected}) {

    const stats = [
        {name: 'Participants', value: `${requestsAccepted.length}/${session.max_attendees}`},
        {name: 'Accepted', value: requestsAccepted.length},
        {name: 'Pending', value: requestsPending.length},
        {name: 'Rejected', value: requestsRejected.length},
    ]

    const accept = (request) => {
        console.log(request)
        router.post(route('sessions.requests.status', [request.session_id, request.id]), {
                status: 1,
            },
            {
                preserveScroll: true,
                replace: true,
            }
        )
    }

    const refuse = (request) => {
        router.post(route('sessions.requests.status', [request.session_id, request.id]), {
                status: 2,
            },
            {
                preserveScroll: true,
                replace: true,
            }
        )
    }

    return (
        <AuthenticatedLayout user={auth.user} header="Request Details">
            <Head title="Request Details"/>
            <main>
                <header>
                    {/* Heading */}
                    <div
                        className="bg-white shadow sm:rounded-lg border border-gray-200  px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
                        <h1 className="text-lg leading-7">
                            <span className="font-semibold ">{session.session_title}</span>
                        </h1>


                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                            {stats.map((stat, statIdx) => (
                                <div
                                    key={stat.name}
                                    className={classNames(
                                        statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                                        'border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8'
                                    )}
                                >
                                    <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
                                    <p className="mt-2 flex items-baseline gap-x-2">
                                    <span
                                        className="text-4xl font-semibold tracking-tight ">{stat.value}</span>
                                        {stat.unit ? <span className="text-sm text-gray-400">{stat.unit}</span> : null}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </header>

                {/* Activity list */}
                <div className="border-t border-white/10 pt-11">
                    <h2 className="px-4 text-base font-semibold leading-7  sm:px-6 lg:px-8">
                        Accepted Requests
                    </h2>
                    {requestsAccepted.length > 0 ? (
                        <div
                            className="max-h-96 overflow-y-auto inline-block w-full shadow-sm border border-gray-100 rounded-lg">

                            <table className="mt-6 w-full whitespace-nowrap text-left">
                                <colgroup>
                                    <col className="w-full sm:w-8/12"/>
                                    <col className="lg:w-4/12"/>
                                </colgroup>
                                <thead className="border-b border-gray-200 text-sm leading-6 ">
                                <tr>
                                    <th scope="col" className="pl-4 sm:pl-6 lg:pl-8">Participant</th>
                                    <th scope="col" className="sm:table-cell">Action</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                {requestsAccepted.map((item) => (
                                    <tr key={item.id}>
                                        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                            <div className="flex items-center gap-x-4">
                                                <img src={item.user.profile_photo} alt=""
                                                     className="h-8 w-8 rounded-full bg-gray-800"/>
                                                <div
                                                    className="truncate text-sm font-medium leading-6 ">{item.user.name}</div>
                                            </div>
                                        </td>
                                        <td className=" py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                            {/* Remove button */}
                                            <button
                                                type="button"
                                                className="rounded-md bg-red-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                                onClick={() => refuse(item)}
                                            >
                                                <div className="flex items-center gap-x-2">
                                                    <XMarkIcon className="h-5 w-5"/>
                                                    <span>Remove</span>
                                                </div>
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-4 text-center text-gray-500">No accepted requests</div>
                    )}
                </div>


                <div className="border-t border-white/10 pt-11">
                    <h2 className="px-4 text-base font-semibold leading-7 sm:px-6 lg:px-8">
                        Pending Requests
                    </h2>
                    {requestsPending.length > 0 ? (
                        <div
                            className="max-h-96 overflow-y-auto inline-block w-full shadow-sm border border-gray-100 rounded-lg">
                            <table className="mt-6 w-full whitespace-nowrap text-left">
                                <colgroup>
                                    <col className="w-full sm:w-8/12"/>
                                    <col className="lg:w-4/12"/>
                                </colgroup>
                                <thead className="border-b border-gray-200 text-sm leading-6 ">
                                <tr>
                                    <th scope="col" className="pl-4 sm:pl-6 lg:pl-8">Participant</th>
                                    <th scope="col" className="sm:table-cell">Action</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                {requestsPending.map((item) => (
                                    <tr key={item.id}>
                                        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                            <div className="flex items-center gap-x-4">
                                                <img src={item.user.profile_photo} alt=""
                                                     className="h-8 w-8 rounded-full bg-gray-800"/>
                                                <div
                                                    className="truncate text-sm font-medium leading-6 ">{item.user.name}</div>
                                            </div>
                                        </td>
                                        <td className=" py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                            <div className="flex items-center gap-x-2">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-red-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                                    onClick={() => refuse(item)}
                                                >
                                                    <div className="flex items-center gap-x-2">
                                                        <XMarkIcon className="h-5 w-5"/>
                                                        <span>Reject</span>
                                                    </div>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-green-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                                                    onClick={() => accept(item)}
                                                >
                                                    <div className="flex items-center gap-x-2">
                                                        <CheckIcon className="h-5 w-5"/>
                                                        <span>Accept</span>
                                                    </div>
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-4 text-center text-gray-500">No pending requests</div>
                    )}
                </div>

                <div className="border-t border-white/10 pt-11">
                    <h2 className="px-4 text-base font-semibold leading-7  sm:px-6 lg:px-8">
                        Rejected Requests
                    </h2>
                    {requestsRejected.length > 0 ? (
                            <div
                                className="max-h-96 overflow-y-auto inline-block w-full shadow-sm border border-gray-100 rounded-lg">

                                <table className="mt-6 w-full whitespace-nowrap text-left">
                                    <colgroup>
                                        <col className="w-full sm:w-8/12"/>
                                        <col className="lg:w-4/12"/>
                                    </colgroup>
                                    <thead className="border-b border-gray-200 text-sm leading-6 ">
                                    <tr>
                                        <th scope="col" className="pl-4 sm:pl-6 lg:pl-8">Participant</th>
                                        <th scope="col" className="sm:table-cell">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                    {requestsRejected.map((item) => (
                                        <tr key={item.id}>
                                            <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                                                <div className="flex items-center gap-x-4">
                                                    <img src={item.user.profile_photo} alt=""
                                                         className="h-8 w-8 rounded-full bg-gray-800"/>
                                                    <div
                                                        className="truncate text-sm font-medium leading-6 ">{item.user.name}</div>
                                                </div>
                                            </td>
                                            <td className=" py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-green-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                                                    onClick={() => accept(item)}
                                                >
                                                    <div className="flex items-center gap-x-2">
                                                        <CheckIcon className="h-5 w-5"/>
                                                        <span>Accept</span>
                                                    </div>
                                                </button>

                                            </td>

                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) :
                        (
                            <div className="p-4 text-center text-gray-500">No rejected requests</div>
                        )
                    }
                </div>
            </main>
        </AuthenticatedLayout>
    )
}
