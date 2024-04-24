import FilterPanel from '@/Components/FilterPanel2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router} from '@inertiajs/react';
import TableWithPaginate from "@/Components/TableWithPaginate.jsx";


export default function ScheduledSession({ auth, sessions, languages }) {

    const formatData = [
        { name: 'Level', keys: ['level'] },
        { name: 'Date', keys: ['date'] },
        { name: 'Language 1', keys: ['language1', 'name'] },
        { name: 'Language 2', keys: ['language2', 'name'] },
    ]

    return (

        <AuthenticatedLayout
            user={auth.user}
            header="Planned Sessions"
        >

            <Head title="Planned Sessions" />

            <FilterPanel languages={languages} routename={'sessions.my-scheduled'}/>
            <TableWithPaginate sessions={sessions} formatData={formatData} onRowClick={(session) => router.get(route('sessions.meeting', session.id))}/>
        </AuthenticatedLayout>
    );
}
