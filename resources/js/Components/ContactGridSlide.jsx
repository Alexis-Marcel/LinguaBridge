import { XMarkIcon, CheckIcon } from '@heroicons/react/20/solid'
import {Head, Link, router} from "@inertiajs/react";



export default function ContactGridSlide({requests}) {

    const accept = (request) => {
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
        <ul role="list" className="flex overflow-x-auto gap-4 p-4">
            {requests.map((request) => (
                <li key={request.id} className="divide-y divide-gray-200 rounded-lg bg-white shadow flex-shrink-0 flex-grow-0 basis-1/4">
                    <div className="flex w-full items-center p-6">
                        <h3 className="truncate text-base font-medium text-gray-900 flex-1 text-center">{request.user.name}</h3>
                        <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={request.user.profile_photo} alt=""/>
                    </div>
                    <div>
                        <div className="flex divide-x divide-gray-200">
                            <div className="flex w-0 flex-1">
                                <button
                                    onClick={() => refuse(request)}
                                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                >
                                    <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                   Refuse
                                </button>
                            </div>
                            <div className="-ml-px flex w-0 flex-1">
                                <button
                                    onClick={() => accept(request)}
                                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                >
                                    <CheckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
