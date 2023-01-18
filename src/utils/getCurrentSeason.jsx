export default function getCurrentSeason() {
    return (new Date()).getMonth() > 7 ?
        new Date().getFullYear() :
        (new Date().getFullYear() - 1)
}