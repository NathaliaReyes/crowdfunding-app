module.exports = {
    get_emoji: (project) => {
        let emoji = "";

        if(project.id % 2 === 0){
            emoji = "💻";
        } else {
            emoji = "⚙️";
        }

        return `<span for="img" aria-label="book">${emoji}</span>`;
    },
};