export function requestStatus(status) {
    switch (status) {
        case 0:
            return 'Pending';
        case 1:
            return 'Accepted';
        case 2:
            return 'Rejected';
        case 3:
            return 'Canceled';
        default:
            return 'Unknown';
    }
}
