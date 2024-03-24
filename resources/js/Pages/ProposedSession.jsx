import FilterPanel from '@/Components/FilterPanel2';
import SimpleTable from '@/Components/SimpleTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TableWithPaginate from "@/Components/TableWithPaginate.jsx";


export default function ProposedSession({ auth, sessions, languages }) {

    const formatData = [
        { name: 'Session Title', keys: ['session_title'] },
        { name: 'Level', keys: ['level'] },
        { name: 'Date', keys: ['date'] },
        { name: 'Language 1', keys: ['language1', 'name'] },
        { name: 'Language 2', keys: ['language2', 'name'] },
    ]

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Proposed Session"
        >
            <Head title="Proposed Session"/>

            <FilterPanel languages={languages} routename={'sessions.my-sessions'}/>
            <TableWithPaginate sessions={sessions} formatData={formatData}/>
        </AuthenticatedLayout>
    );
}
