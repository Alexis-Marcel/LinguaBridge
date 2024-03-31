
import {Head, Link, router} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TableWithPaginate from "@/Components/TableWithPaginate.jsx";
import FilterPanel from "@/Components/FilterPanel2.jsx";
import { usePage} from "@inertiajs/react";


export default function SearchSession({auth, sessions, languages}) {

    const formatData = [
        { name: 'Level', keys: ['level'] },
        { name: 'Date', keys: ['date'] },
        { name: 'Language 1', keys: ['language1', 'name'] },
        { name: 'Language 2', keys: ['language2', 'name'] },
        { name: 'Proposed By', keys: ['host', 'name'] },
    ]
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Search Session"
        >
            <Head title="Search Session"/>

            <FilterPanel languages={languages} routename={'sessions.index'}/>
            <TableWithPaginate sessions={sessions} formatData={formatData} onRowClick={(session) => router.get(route('sessions.show', session.id))}/>
        </AuthenticatedLayout>

    )

}
