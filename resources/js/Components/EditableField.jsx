import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {CheckIcon, PencilSquareIcon, XMarkIcon} from "@heroicons/react/20/solid/index.js";

export default function EditableField({isEditing, value, children, reset, submit, setEditField}) {

    return (
        <div className="flex items-center gap-2">
            {isEditing ? (<>

                            {children}

                        <div className="flex gap-2">
                            <button
                                onClick={reset}
                                className="text-indigo-600 hover:text-indigo-900"
                            >
                                <XMarkIcon className="h-5 w-5"/>
                            </button>
                            <button
                                onClick={submit}
                                className="text-indigo-600 hover:text-indigo-900"
                            >
                                <CheckIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    </>
                ) :
                (
                    <>
                        <p>{value}</p>
                        <button
                            onClick={setEditField}
                            className="text-indigo-600 hover:text-indigo-900"
                        >
                            <PencilSquareIcon className="h-5 w-5"/>
                        </button>
                    </>
                )}
        </div>
    )
}
