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
            name: "My precious scraps",
            doneTooltip: "your scrap obsession becomes noticeable",
            done() { return player.j.points.gte(20) },
            // more features
        },
    }

});