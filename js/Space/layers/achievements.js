addLayer("a", {
    name: "Achievements",
    symbol: "A",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    row: "side",
    achievements: {
        11: {
            name: "Scrap License",

            doneTooltip: "At 20 scraps, you are know known as a professional scrap collector (you gain more space fame).",
            done() { return player.j.points.gte(20) },
        },
        12: {
            name: "Robot Army",

            doneTooltip: "At 1000 robots, you have a small army of robots (you gain more space fame).",
            done() { return player.w.points.gte(100) },
        },
    }

});