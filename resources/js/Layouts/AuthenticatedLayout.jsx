/* import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
 */

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Footer from "../Components/Footer";

const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
    { name: "Dashboard", href: "#", current: true },
    { name: "Team", href: "#", current: false },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
    { name: "Reports", href: "#", current: false },
];
const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Authenticated({ user, header, children }) {
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            <div className="min-h-full">
                <div className="bg-indigo-600 pb-32">
                    <Disclosure
                        as="nav"
                        className="border-b border-indigo-300 border-opacity-25 bg-indigo-600 lg:border-none"
                    >
                        {({ open }) => (
                            <>
                                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                                    <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                                        <div className="flex items-center px-2 lg:px-0">
                                            <div className="flex-shrink-0">
                                                <Link href="/">
                                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                                </Link>
                                            </div>
                                            <div className="hidden lg:ml-10 lg:block">
                                                <div className="flex space-x-4">
                                                    {navigation.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className={classNames(
                                                                item.current
                                                                    ? "bg-indigo-700 text-white"
                                                                    : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                                                                "rounded-md py-2 px-3 text-sm font-medium"
                                                            )}
                                                            aria-current={
                                                                item.current
                                                                    ? "page"
                                                                    : undefined
                                                            }
                                                        >
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {/*  <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                      <div className="w-full max-w-lg lg:max-w-xs">
                        <label htmlFor="search" className="sr-only">
                          Search
                        </label>
                        <div className="relative text-gray-400 focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <input
                            id="search"
                            className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Search"
                            type="search"
                            name="search"
                          />
                        </div>
                      </div>
                    </div> */}
                                        <div className="flex lg:hidden">
                                            {/* Mobile menu button */}
                                            <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">
                                                    Open main menu
                                                </span>
                                                {open ? (
                                                    <XMarkIcon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <Bars3Icon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </Disclosure.Button>
                                        </div>
                                        <div className="hidden lg:ml-4 lg:block">
                                            <div className="flex items-center">
                                                <button
                                                    type="button"
                                                    className="relative flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                                                >
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">
                                                        View notifications
                                                    </span>
                                                    <BellIcon
                                                        className="h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                </button>

                                                {/* Profile dropdown */}
                                                <Menu
                                                    as="div"
                                                    className="relative ml-3 flex-shrink-0"
                                                >
                                                    <div>
                                                        <Menu.Button className="relative flex rounded-full bg-indigo-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                                                            <span className="absolute -inset-1.5" />
                                                            <span className="sr-only">
                                                                Open user menu
                                                            </span>
                                                            <img
                                                                className="h-8 w-8 rounded-full"
                                                                src={
                                                                    user.imageUrl
                                                                }
                                                                alt=""
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
                                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            {userNavigation.map(
                                                                (item) => (
                                                                    <Menu.Item
                                                                        key={
                                                                            item.name
                                                                        }
                                                                    >
                                                                        {({
                                                                            active,
                                                                        }) => (
                                                                            <a
                                                                                href={
                                                                                    item.href
                                                                                }
                                                                                className={classNames(
                                                                                    active
                                                                                        ? "bg-gray-100"
                                                                                        : "",
                                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                                )}
                                                                            >
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </a>
                                                                        )}
                                                                    </Menu.Item>
                                                                )
                                                            )}
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Disclosure.Panel className="lg:hidden">
                                    <div className="space-y-1 px-2 pb-3 pt-2">
                                        {navigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? "bg-indigo-700 text-white"
                                                        : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                                                    "block rounded-md py-2 px-3 text-base font-medium"
                                                )}
                                                aria-current={
                                                    item.current
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                    <div className="border-t border-indigo-700 pb-3 pt-4">
                                        <div className="flex items-center px-5">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-10 w-10 rounded-full"
                                                    src={user.imageUrl}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-base font-medium text-white">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm font-medium text-indigo-300">
                                                    {user.email}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="relative ml-auto flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                                            >
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">
                                                    View notifications
                                                </span>
                                                <BellIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                        <div className="mt-3 space-y-1 px-2">
                                            {userNavigation.map((item) => (
                                                <Disclosure.Button
                                                    key={item.name}
                                                    as="a"
                                                    href={item.href}
                                                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                                                >
                                                    {item.name}
                                                </Disclosure.Button>
                                            ))}
                                        </div>
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>

                    {header && (
                        <header className="py-10">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <h1 className="text-3xl font-bold tracking-tight text-white">
                                    {header}
                                </h1>
                            </div>
                        </header>
                    )}
                </div>
                <main className="-mt-32">{children}</main>
                <Footer />
            </div>
        </>
    );
}
