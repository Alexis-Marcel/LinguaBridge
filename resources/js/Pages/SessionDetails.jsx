import {PaperClipIcon} from '@heroicons/react/20/solid'
import {Head, Link, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {formatDate, formatDuration} from "@/Utils/dateUtils.js";


function sizeFormat(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

export default function SessionDetails({auth, session}) {

    console.log(session);

    return (
        <AuthenticatedLayout user={auth.user} header="Session Details">
            <Head title="Session Details"/>
            <div className="flex mb-8">
                <div className="px-4 py-6 sm:px-6">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Session Information</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Proposed by {session.host.name}</p>
                </div>
                {/* cover image */}
                <div className="flex-1 flex justify-center items-center">
                    <img className="max-h-fit rounded-2xl w-1/2" src={session.cover_photo} alt=""/>
                </div>
                {session.host_id === auth.user.id && (
                <div className="ml-auto flex flex-col justify-center gap-4">
                    <button
                        type="button"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => router.get(route('sessions.requests.index', session.id))}
                    >
                        Manage Requests
                    </button>
                    <button
                        type="button"
                        className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        onClick={() => router.post(route('sessions.start', session.id))}
                    >
                        Validate Session
                    </button>
                    <button
                        type="button"
                        className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        onClick={() => router.delete(route('sessions.destroy', session.id))}
                    >

                        Delete Session
                    </button>
                </div>
                )}

            </div>
            <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Session Title</dt>

                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {session.session_title}
                        </dd>


                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Description</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.description}</dd>

                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Date details</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                            <div className=" items-center gap-2">
                                <div className="text-sm font-medium text-gray-900">Date & Time</div>
                                <div className="text-sm text-gray-700">{formatDate(session.date)}</div>
                            </div>
                        </dd>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                            <div className=" items-center gap-2">
                                <div className="text-sm font-medium text-gray-900">Duration</div>
                                <div className="text-sm text-gray-700">{formatDuration(session.duration)}</div>
                            </div>
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Language details</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                            <div className=" items-center gap-2">
                                <div className="text-sm font-medium text-gray-900">Language 1</div>
                                <div className="text-sm text-gray-700">{session.language1.name}</div>
                            </div>
                        </dd>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                            <div className=" items-center gap-2">
                                <div className="text-sm font-medium text-gray-900">Language 2</div>
                                <div className="text-sm text-gray-700">{session.language2.name}</div>
                            </div>
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Level</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.level}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Participants</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.participants}/{session.max_attendees-1}</dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Preparation</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {session.preparation}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Materials</dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            {session.material ?
                                (
                                    <ul role="list"
                                        className="divide-y divide-gray-100 rounded-md border border-gray-200">

                                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div className="flex w-0 flex-1 items-center">
                                                <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                               aria-hidden="true"/>
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span
                                                    className="truncate font-medium">{session.material.name}</span>
                                                    <span
                                                        className="flex-shrink-0 text-gray-400">{sizeFormat(session.material.size)}</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <Link
                                                    href={route('sessions.download-material', [session.id, session.material.id])}
                                                    className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    Download
                                                </Link>
                                            </div>
                                        </li>
                                    </ul>
                                )
                                :
                                (
                                    <div> No material provided</div>
                                )
                            }
                        </dd>
                    </div>
                </dl>
            </div>
            {session.host_id !== auth.user.id && session.my_request === null && (
                <div className="flex justify-end border-t border-gray-100 pt-5">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => router.post(route('sessions.requests.store', session.id))}
                    >
                        Request to participate
                    </button>
                </div>
            )}
        </AuthenticatedLayout>
    )
}
