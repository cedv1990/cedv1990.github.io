const init = circles => {
    let position = 0;

    const getTimes = () => Math.floor(Math.random() * 160) + 20;
    const clean = c => c.style.stroke = null;
    let time;

    return () => {
        let times = getTimes();
        clearTimeout(time);
        const fn = () => {
            circles.forEach(clean);
            circles[position].style.stroke = '#9C27B0';//getComputedStyle(circles[position])['fill'].split(')').join('') + ', .5)';
            position = (position + 1) % 16;
            if (times > 0) {
                time = setTimeout(fn, 500/times);
                times--;
            }
        };
        fn();
    };
};

export default init;