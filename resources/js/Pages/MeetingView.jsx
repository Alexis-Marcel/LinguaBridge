import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ZoomMeeting from "@/Components/ZoomMeeting.jsx";

export default function MeetingView({auth, session}) {

    console.log(session);

    return (
        <AuthenticatedLayout user={auth.user} header="Session Details">
            <Head title={"Meeting" + session.session_title}/>
            <div className="bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-bold text-gray-800">Session Details</h1>
                <div className="mt-4">
                    <p className="text-gray-600">Meeting ID: {session.meeting_id}</p>
                    <p className="text-gray-600">Meeting Password: {session.meeting_password}</p>
                    <p className="text-gray-600">Language 1: {session.language1.name}</p>
                    <p className="text-gray-600">Language 2: {session.language2.name}</p>
                </div>
            </div>
            <ZoomMeeting meetingNumber={session.meeting_id} userName={auth.user.name}/>
        </AuthenticatedLayout>
    )
}
