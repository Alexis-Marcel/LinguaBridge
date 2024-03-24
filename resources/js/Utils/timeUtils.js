
export function durationToMinutes(duration) {
    const [hours, minutes] = duration.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
}

export function minutesToDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${remainingMinutes.toString().padStart(2, "0")}`;
}
