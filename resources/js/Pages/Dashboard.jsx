import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Dashboard"
        >
            <Head title="Dashboard"/>


                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Welcome, {auth.user.name}</h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">You are logged in! You can now start creating your own sessions and invite your friends to join.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href={route('sessions.index')}
                               className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Discover sessions</Link>

                        </div>
                    </div>


            </div>

        </AuthenticatedLayout>
    );
}
