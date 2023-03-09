export const validateData = (data: any) => {
    for (const key in data) {
        if (typeof data[key] !== "string" || data[key] === "") {
            return false
        }
    }
    return true
}