const colors = ['red', 'green', 'yellow', 'blue'];

const init = circles => {
    const arrayCircles = Array.from(circles);

    arrayCircles.forEach((c, i) => c.classList.add(colors[i%4]));
};

export default { init };