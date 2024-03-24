import {PaperClipIcon} from '@heroicons/react/20/solid'
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {durationToMinutes, minutesToDuration} from "@/Utils/timeUtils.js";

export default function SessionDetails({auth, session}) {
    console.log(session)
    return (
        <AuthenticatedLayout user={auth.user} header="Session Details">
            <Head title="Session Details"/>
            <div className="px-4 py-6 sm:px-6">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Session Information</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Proposed by {session.host.name}</p>
            </div>
            <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Session Title</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{session.session_title}</dd>

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
                                <div className="text-sm text-gray-700">{session.date}</div>
                            </div>
                        </dd>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0">
                            <div className=" items-center gap-2">
                                <div className="text-sm font-medium text-gray-900">Duration</div>
                                <div className="text-sm text-gray-700">{minutesToDuration(session.duration)}</div>
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
                        <dt className="text-sm font-medium text-gray-900">Preparation</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {session.preparation}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Materials</dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                    <div className="flex w-0 flex-1 items-center">
                                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                       aria-hidden="true"/>
                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span
                                                    className="truncate font-medium">resume_back_end_developer.pdf</span>
                                            <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                            Download
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                    <div className="flex w-0 flex-1 items-center">
                                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                       aria-hidden="true"/>
                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span
                                                    className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                                            <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                                        </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                            Download
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>
        </AuthenticatedLayout>
    )
}
