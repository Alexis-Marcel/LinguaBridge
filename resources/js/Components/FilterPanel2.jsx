import {router} from "@inertiajs/react";
import {Dialog, Popover, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline/index.js";
import Combobox from "@/Components/ComboBox.jsx";
import {ChevronDownIcon} from "@heroicons/react/20/solid/index.js";
import {Fragment, useEffect, useRef, useState} from 'react'

const options = [

    {value: 'beginner', label: 'Beginner'},
    {value: 'intermediate', label: 'Intermediate'},
    {value: 'advanced', label: 'Advanced'},

]

export default function FilterPanel({languages, routename}) {


    const [open, setOpen] = useState(false)

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLanguage1, setSelectedLanguage1] = useState(null)
    const [selectedLanguage2, setSelectedLanguage2] = useState(null)
    const firstUpdate = useRef(true);
    const [levelFilters, setLevelFilters] = useState([]);

    const handleFilterChange = () => {

        const newFilters = {
            session_title: searchTerm === '' ? undefined : searchTerm,
            level: levelFilters.length === 0 ? undefined : levelFilters,
            language1: selectedLanguage1?.code,
            language2: selectedLanguage2?.code
        }

        router.get(route(routename), newFilters, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    useEffect(() => {
            if (firstUpdate.current) {
                firstUpdate.current = false;
                return;
            }
            handleFilterChange();
        }
        , [searchTerm, selectedLanguage1, selectedLanguage2, levelFilters]);

    return <>
        {/* Mobile filter dialog */}
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel
                            className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4">
                                {/*{filters.map((section) => (
                                    <Disclosure as="div" key={section.name}
                                                className="border-t border-gray-200 px-4 py-6">
                                        {({open}) => (
                                            <>
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <Disclosure.Button
                                                        className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                                                            <span
                                                                className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                <ChevronDownIcon
                                    className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                    aria-hidden="true"
                                />
                              </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-6">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-500"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}*/}
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>

        {/* filter panel */}
        <div className="flex items-center justify-end">


            {/*<Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {sortOptions.map((option) => (
                            <Menu.Item key={option}>
                                {({active}) => (
                                    <a
                                        href={option.href}
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm font-medium text-gray-900'
                                        )}
                                    >
                                        {option.name}
                                    </a>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>*/}

            {/* Mobile filter button */}
            <button
                type="button"
                className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                onClick={() => setOpen(true)}
            >
                Filters
            </button>

            <div className="hidden sm:flex sm:items-baseline sm:space-x-4 mr-4">

                <div className="mr-4">
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                        Session Title
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Enter a title"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </div>
                </div>

                <Combobox as="div" selected={selectedLanguage1} setSelected={setSelectedLanguage1} label="Language 1"
                          options={languages}/>
                <Combobox as="div" selected={selectedLanguage2} setSelected={setSelectedLanguage2} label="Language 2"
                          options={languages}/>

            </div>
            <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">

                <Popover
                    as="div"
                    className="relative inline-block text-left"
                >
                    <div>
                        <Popover.Button
                            className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                            <span>Level</span>
                            <span
                                className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                          {levelFilters.length}
                        </span>
                            <ChevronDownIcon
                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                            />
                        </Popover.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Popover.Panel
                            className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <form className="space-y-4">
                                {options.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                        <input
                                            id="level"
                                            name="level"
                                            defaultValue={option.value}
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setLevelFilters([...levelFilters, option.value])
                                                } else {
                                                    setLevelFilters(levelFilters.filter((filter) => filter !== option.value))
                                                }
                                            }
                                            }
                                        />
                                        <label
                                            htmlFor="level"
                                            className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                        >
                                            {option.label}
                                        </label>
                                    </div>
                                ))}

                            </form>
                        </Popover.Panel>
                    </Transition>
                </Popover>

            </Popover.Group>
        </div>
    </>
}
