export const isEmpty = (obj) => {
    for (let key in obj) {
        return false;
    }
    return true;
}

export const daysOfTheWeek = (n) => {
    const days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота']

    return days[n]
}


const d = new Date()
const n = d.getDay()

