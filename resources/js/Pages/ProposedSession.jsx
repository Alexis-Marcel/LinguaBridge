import FilterPanel from '@/Components/FilterPanel';
import SimpleTable from '@/Components/SimpleTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const sortOptions = [
    { name: 'Most Popular', href: '#' },
    { name: 'Best Rating', href: '#' },
    { name: 'Newest', href: '#' },
]

const filters = [
    {
        id: 'language1',
        name: 'Languages 1',
        options: [
            { value: 'english', label: 'English'},
            { value: 'french', label: 'French'},
            { value: 'german', label: 'German'},
            { value: 'spanish', label: 'Spanish'},
        ],
    },
    {
        id: 'language2',
        name: 'Languages 2',
        options: [
            { value: 'english', label: 'English'},
            { value: 'french', label: 'French'},
            { value: 'german', label: 'German'},
            { value: 'spanish', label: 'Spanish'},
        ],
    },
    {
        id: 'level',
        name: 'Level',
        options: [
            { value: 'beginner', label: 'Beginner'},
            { value: 'intermediate', label: 'Intermediate'},
            { value: 'advanced', label: 'Advanced'},
        ],
    },
]

const formatData = [
    { name: 'Session Title', data: 'session_title' },
    { name: 'Level', data: 'level' },
    { name: 'Date', data: 'date' },
    { name: 'Primary Language', data: 'language1' },
    { name: 'Secondary Language', data: 'language2' },
]
export default function SearchSession({ auth, sessions }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Proposed Sessions"
        >
        <Head title="Search Session" />

            <FilterPanel title="Your proposed session" description="Find the perfect fit for you." filters={filters} sortOptions={sortOptions} routename="proposed-session" />
            <SimpleTable formatData={formatData} data={sessions} />
        </AuthenticatedLayout>
    );
}
