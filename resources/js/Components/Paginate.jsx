import {Link} from "@inertiajs/react";
import {ArrowLongLeftIcon, ArrowLongRightIcon} from "@heroicons/react/20/solid/index.js";
import {classNames} from "@/Utils/classNames.js";

export default function Paginate({pageData}) {
    return (
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
            <div className="-mt-px flex w-0 flex-1">
                <Link
                    href={pageData.prev_page_url}
                    className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                    <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    Previous
                </Link>
            </div>
            <div className="hidden md:-mt-px md:flex">
                {Array.from({length: pageData.last_page}, (_, i) => i + 1).map((page) => (
                    <Link
                        key={page}
                        href={pageData.links[page].url}
                        className={classNames(
                            page === pageData.current_page ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium'
                        )}
                    >
                        {page}
                    </Link>
                ))}
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
                <Link
                    href={pageData.next_page_url}
                    className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                    Next
                    <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                </Link>
            </div>
        </nav>
    )
}
