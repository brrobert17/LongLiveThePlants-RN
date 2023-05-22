export const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.toLocaleDateString("se");
    const time = today.toLocaleTimeString();
    return date + '-' + time;
};