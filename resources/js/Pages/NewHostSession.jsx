import {PhotoIcon} from "@heroicons/react/24/solid";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "../Components/TextInput";
import {useForm} from "@inertiajs/react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import ComboBox from "@/Components/ComboBox.jsx";
import {durationToMinutes, minutesToDuration, minutesToTimeInput, timeInputToMinutes} from "@/Utils/dateUtils.js";

export default function NewHostSession({auth, languages}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        session_title: "",
        language1: null,
        language2: null,
        description: "",
        cover_photo: undefined,
        level: "Beginner",
        date_time: "",
        duration: 10,
        maximum_participants: 2,
        preparation: "",
        materials: undefined,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("sessions.store"));
    };

    function codeToLanguage(code) {
        const language = languages.find((language) => language.code === code);
        if (language === undefined) {
            return null;
        }
        return language;
    }


    return (
        <AuthenticatedLayout user={auth.user} header="New Host Session">
            <form onSubmit={submit}>
                <div className="divide-y divide-gray-900/10">
                    <div className="grid grid-cols-1 gap-x-8 pb-10 gap-y-8 md:grid-cols-3">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Session Details
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Enter the foundational information about your
                                session, including what language will be
                                practiced, the proficiency level targeted, and a
                                detailed description of session activities and
                                goals.
                            </p>
                        </div>

                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                            <div className="px-4 py-6 sm:p-8">
                                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="session-title"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Session Title
                                        </label>
                                        <div className="mt-2">
                                            <TextInput
                                                name="session-title"
                                                id="session-title"
                                                autoComplete="session-title"
                                                value={data.session_title}
                                                onChange={(e) =>
                                                    setData(
                                                        "session_title",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.session_title}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <ComboBox label={"Language 1"} selected={codeToLanguage(data.language1)}
                                              setSelected={(value) => setData("language1", value?.code)}
                                              options={languages} className="sm:col-span-3" errors={errors.language1}/>

                                    <ComboBox label={"Language 2"} selected={codeToLanguage(data.language2)}
                                              setSelected={(value) => setData("language2", value?.code)}
                                              options={languages} className="sm:col-span-3" errors={errors.language2}/>

                                    <div className="col-span-full">
                                        <label
                                            htmlFor="description"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="description"
                                                name="description"
                                                rows={3}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={data.description}
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.description}
                                                className="mt-2"
                                            />
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-gray-600">
                                            Briefly describe the session.
                                        </p>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="level"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Level
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="level"
                                                name="level"
                                                autoComplete="level"
                                                value={data.level}
                                                onChange={(e) =>
                                                    setData(
                                                        "level",
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option>Beginner</option>
                                                <option>Intermediate</option>
                                                <option>Advanced</option>
                                            </select>
                                            <InputError
                                                message={errors.level}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label
                                            htmlFor="cover-photo"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Cover photo
                                        </label>
                                        <div
                                            className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <div className="w-24 h-24 mx-auto">
                                                    {!data.cover_photo ? (
                                                        <PhotoIcon
                                                            className="mx-auto h-12 w-12 text-gray-300"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={URL.createObjectURL(
                                                                data.cover_photo
                                                            )}
                                                            alt="Cover photo"
                                                            className="mx-auto h-24  rounded-lg"
                                                        />
                                                    )}
                                                </div>
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="cover-photo"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>
                                                            Upload a file
                                                        </span>
                                                        <input
                                                            id="cover-photo"
                                                            name="cover-photo"
                                                            type="file"
                                                            onChange={(e) => {
                                                                setData(
                                                                    "cover_photo",
                                                                    e.target
                                                                        .files[0]
                                                                );
                                                            }}
                                                            className="sr-only"
                                                        />
                                                    </label>
                                                    <p className="pl-1">
                                                        or drag and drop
                                                    </p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">
                                                    PNG, JPG, GIF up to 10MB
                                                </p>
                                            </div>
                                        </div>
                                        <InputError message={errors.cover_photo} className="mt-2"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Scheduling
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Specify when your session will take place, how
                                long it will last, and the maximum number of
                                participants you can accommodate.
                            </p>
                        </div>

                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                            <div className="px-4 py-6 sm:p-8">
                                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="date-time"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Date & Time
                                        </label>
                                        <div className="mt-2">
                                            <TextInput
                                                type="datetime-local"
                                                name="date-time"
                                                id="date-time"
                                                autoComplete="date-time"
                                                value={data.date_time}
                                                onChange={(e) =>
                                                    setData(
                                                        "date_time",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.date_time}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="duration"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Duration (hh:mm)
                                        </label>
                                        <div className="mt-2">
                                            <TextInput
                                                type="time"
                                                name="duration"
                                                id="duration"
                                                step="600"
                                                min="00:00"
                                                max="24:00"
                                                value={timeInputToMinutes(data.duration)}
                                                onChange={(e) =>
                                                    setData(
                                                        "duration",
                                                        minutesToTimeInput(e.target.value)
                                                    )

                                                }
                                                autoComplete="duration"
                                            />
                                            <InputError
                                                message={errors.duration}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="maximum-participants"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Maximum Participants
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="maximum-participants"
                                                name="maximum-participants"
                                                type="number"
                                                min={2}
                                                max={100}
                                                value={
                                                    data.maximum_participants
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "maximum_participants",
                                                        e.target.value
                                                    )
                                                }
                                                autoComplete="maximum-participants"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
                        <div className="px-4 sm:px-0">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Preparation & Materials
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Indicate any preparations participants need to
                                make in advance and upload or list any materials
                                for the session.
                            </p>
                        </div>

                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                            <div className="px-4 py-6 sm:p-8">
                                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label
                                            htmlFor="preparation"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Preparation
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="preparation"
                                                name="preparation"
                                                rows={3}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={data.preparation}
                                                onChange={(e) =>
                                                    setData(
                                                        "preparation",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-gray-600">
                                            Briefly describe what participants
                                            should prepare.
                                        </p>
                                    </div>

                                    <div className="col-span-full">
                                        <label
                                            htmlFor="cover-photo"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Materials
                                        </label>
                                        <div
                                            className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <PhotoIcon
                                                    className="mx-auto h-12 w-12 text-gray-300"
                                                    aria-hidden="true"
                                                />
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="materials"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>
                                                            Upload a file
                                                        </span>
                                                        <input
                                                            id="materials"
                                                            name="materials"
                                                            type="file"
                                                            className="sr-only"
                                                            value={
                                                                data.materials
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "materials",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                    <p className="pl-1">
                                                        or drag and drop
                                                    </p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">
                                                    PDF, DOC, PPT up to 10MB
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-6 px-4 py-4 sm:px-8">
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Cancel
                        </button>

                        <PrimaryButton disabled={processing}>
                            Create Session
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
