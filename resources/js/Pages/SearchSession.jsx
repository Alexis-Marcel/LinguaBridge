import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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

import FilterPanel from '@/Components/FilterPanel';
import SimpleTable from '@/Components/SimpleTable';
import { Head } from '@inertiajs/react';
export default function SearchSession({ auth, sessions }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
        <Head title="Search Session" />

            <FilterPanel title="Search Session" description="Find the perfect fit for you." filters={filters} sortOptions={sortOptions} routename="search-session" />
            <SimpleTable formatData={formatData} data={sessions} />
        </AuthenticatedLayout>
    );
}
