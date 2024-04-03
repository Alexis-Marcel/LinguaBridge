import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, router} from "@inertiajs/react";
import ContactGridSlide from "@/Components/ContactGridSlide.jsx";
import FilterPanel from "@/Components/FilterPanel2.jsx";
import Paginate from "@/Components/Paginate.jsx";

export default function SessionRequests({auth, sessions, languages}) {
    return (
        <Authenticated user={auth.user} header="Session Requests">
            <Head title="Session Requests"/>

                <FilterPanel routename={'sessions.sessionRequests'} languages={languages}/>
                {sessions.data.length ?
                    <div>
                    <div className="grid grid-cols-1 gap-4 ">
                        {sessions.data.map((session) => (
                        <div key={session.id}
                             className="bg-white shadow sm:rounded-lg border border-gray-200 px-4 py-5 sm:px-6">

                            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                                <div className="ml-4 mt-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-12 w-12 rounded-full"
                                                src={session.cover_photo}
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-semibold leading-6 text-gray-900">{session.session_title}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-4 mt-4 flex flex-shrink-0">
                                    <button
                                        type="button"
                                        className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={() => router.get(route('sessions.requests.index', session.id))}
                                    >
                                        Manage Requests
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4">
                                {session.requests.length ? (
                                    <div>
                                        <h2 className="text-base font-semibold leading-6 text-gray-900">Requests in
                                            pending</h2>
                                        <ContactGridSlide key={session.id} requests={session.requests}/>
                                    </div>
                                ) : (
                                    <h2 className="text-base font-semibold leading-6 text-gray-900">
                                        No requests in pending
                                    </h2>
                                )}
                            </div>
                        </div>


                        ))}
                    </div>
                        <Paginate pageData={sessions}/>
                    </div>
                        :
                        (
                        <div className="sm:rounded-lg border border-gray-200 px-4 py-5 sm:px-6">
                            <p>No sessions found</p>
                        </div>
                        )
                        }


                    </Authenticated>

                    )
                }
