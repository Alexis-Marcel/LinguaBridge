import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ZoomMeeting from "@/Components/ZoomMeeting.jsx";

export default function MeetingView({auth, session}) {

    console.log(session);

    return (
        <AuthenticatedLayout user={auth.user} header="Session Details">
            <Head title={session.session_title}/>
            <meta http-equiv="origin-trial"
                  content="AiPME2z8Xn/4yQvPcQO51g6IKDVTr5kLUhDWsp5qVnsjYW1YffxLyiSzYRQMw0kRo/8+vtuXoqD70yYn5FCACwEAAABeeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjgwIiwiZmVhdHVyZSI6IlVucmVzdHJpY3RlZFNoYXJlZEFycmF5QnVmZmVyIiwiZXhwaXJ5IjoxNzE5MzU5OTk5fQ=="/>
            <div className="bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-bold text-gray-800">Session Details</h1>
                <div className="mt-4">
                    <p className="text-gray-600">Meeting ID: {session.meeting_id}</p>
                    <p className="text-gray-600">Meeting Password: {session.meeting_password}</p>
                    <p className="text-gray-600">Language 1: {session.language1.name}</p>
                    <p className="text-gray-600">Language 2: {session.language2.name}</p>
                </div>
            </div>
            <div className="mt-4 mb-700">
                <ZoomMeeting
                    meetingNumber={session.meeting_id}
                    userName={auth.user.name}
                />
            </div>
        </AuthenticatedLayout>
    )
}
