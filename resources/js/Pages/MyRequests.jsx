import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, router} from "@inertiajs/react";
import ContactGridSlide from "@/Components/ContactGridSlide.jsx";
import FilterPanel from "@/Components/FilterPanel2.jsx";
import Paginate from "@/Components/Paginate.jsx";
import {requestStatus} from "@/Utils/requestStatus.js";

export default function MyRequests({auth, sessions, languages}) {
    return (
        <Authenticated user={auth.user} header="Session Requests">
            <Head title="My Requests"/>

            <FilterPanel routename={'sessions.my-requests'} languages={languages}/>
            {sessions.data.length ?
                <div>
                    <div className="grid grid-cols-1 gap-4 ">
                        {sessions.data.map((session) => (
                            <div key={session.id}
                                 className="bg-white shadow sm:rounded-lg border border-gray-200 px-4 py-5 sm:px-6 cursor-pointer hover:bg-gray-50"
                                 onClick={() => router.get(route('sessions.show', session.id))}
                            >

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
                                            className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-100"
                                            onClick={() => router.delete(route('sessions.requests.destroy', [session.id, session.my_request.id]))}
                                        >
                                            Cancel Request
                                        </button>
                                    </div>
                                </div>


                                        <div className="flex items-center gap-4 mt-4">
                                            <h2 className="text-base font-medium leading-6 text-gray-900">The status of your request is :</h2>
                                            <span className="text-base font-semibold leading-6 text-gray-900">{requestStatus(session.my_request.status)}</span>
                                        </div>


                            </div>


                        ))}
                    </div>
                    <Paginate pageData={sessions}/>
                </div>
                :
                (
                    <div className="sm:rounded-lg border border-gray-200 px-4 py-5 sm:px-6">
                        <p>No requests in pending</p>
                    </div>
                )
            }


        </Authenticated>

    )
}
