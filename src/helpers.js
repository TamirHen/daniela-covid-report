module.exports = {
    getTodayISO: () => {
        let today = new Date()
        // set to UTC-8
        today.setHours(today.getHours() - 8);
        return today.toISOString().split('T')[0]
    }
}