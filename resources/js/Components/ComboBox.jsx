import {Combobox} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid/index.js";
import {useState} from "react";
import {classNames} from "@/Utils/classNames.js";
import {XMarkIcon} from "@heroicons/react/24/outline";
import InputError from "@/Components/InputError.jsx";


export default function ComboBox({label, options, selected, setSelected, className, errors}) {

    const [query, setQuery] = useState('')

    const filtered =
        query === ''
            ? options
            : options.filter((option) => {
                return option.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <div className={className}>
        <Combobox as="div" value={selected} onChange={setSelected}>
            <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Combobox.Label>
            <div className="relative mt-2">
                <Combobox.Input
                    className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(language) => language?.name}

                />

                {!selected ? (
                    <Combobox.Button
                        className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </Combobox.Button>
                ) : (

                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
                        onClick={() => {
                            setSelected('')
                            setQuery('')
                        }
                        }
                    >
                        <span className="sr-only">Clear</span>
                        <span className="text-gray-400 hover:text-gray-500">
                <XMarkIcon className="h-5 w-5" aria-hidden="true"/>
                </span>
                    </button>
                )}

                {filtered.length > 0 && (
                    <Combobox.Options
                        className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filtered.map((option) => (
                            <Combobox.Option
                                key={option.id}
                                value={option}
                                className={({active}) =>
                                    classNames(
                                        'relative cursor-default select-none py-2 pl-3 pr-9',
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                    )
                                }
                            >
                                {({active, selected}) => (
                                    <>
                                        <span
                                            className={classNames('block truncate', selected && 'font-semibold')}>{option.name}</span>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                    active ? 'text-white' : 'text-indigo-600'
                                                )}
                                            >
                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
            <div className="mt-2 ml-1">
            <InputError
                message={errors}
                className="mt-2"
            />
            </div>
        </div>
    );
}
