
export function timeInputToMinutes(duration) {
    const [hours, minutes] = duration.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
}

export function minutesToTimeInput(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${remainingMinutes.toString().padStart(2, "0")}`;
}


export function formatDate(date) {
    // date and time without seconds
    return new Date(date).toLocaleString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
}

export function formatDuration(duration) {
    // duration in minutes to hours and minutes
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours} hours ${minutes} minutes`;
}
