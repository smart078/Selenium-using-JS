const randomNumber = (max = 5) => {
    return Math.floor(Math.random() * max) + 1;
}

module.exports = { randomNumber }