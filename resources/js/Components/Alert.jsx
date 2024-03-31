import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { classNames } from "@/Utils/classNames.js";
import { useEffect, useState } from "react";

export default function Alert({message, type}) {

    const [show, setShow] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 3000)
    } , [])

    return (
        <div>
            {show && (
                <div className={classNames(type === 'success' ? 'bg-green-50' : 'bg-red-50', 'p-4 rounded-md')}>
                    <div className="flex">
                        <div className="flex-shrink-0">
                            {type === 'success' ?
                                <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true"/> :
                                <XMarkIcon className="h-5 w-5 text-red-400" aria-hidden="true"/>}
                        </div>
                        <div className="ml-3">
                            <p className={classNames(type === 'success' ? 'text-green-700' : 'text-red-700', 'text-sm font-medium')}>{message}</p>
                        </div>
                        <div className="ml-auto pl-3">
                            <div className="-mx-1.5 -my-1.5">
                                <button
                                    type="button"
                                    className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                                    onClick={() => setShow(false)}
                                >
                                    <span className="sr-only">Dismiss</span>
                                    <XMarkIcon className="h-5 w-5" aria-hidden="true"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
