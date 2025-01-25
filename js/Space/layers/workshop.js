addLayer("w", {
    name: "Workshop",
    symbol: "W",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0), // Accumulated Parts
    }},
    color: "#00ccff",
    requires: new Decimal(500), // Requires 500 Energy to unlock
    resource: "Junk Robots", // Name of prestige currency
    baseResource: "Parts",
    baseAmount() { return player.points.times(player.j.points) }, // Depends on Energy
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let mult = new Decimal(1);
        if (hasUpgrade("w", 11)) mult = mult.times(1.1); // Optimized Production
        return mult;
        },
    gainExp() { return new Decimal(1) },
    row: 1,
    hotkeys: [
        { key: "w", description: "G: Collect Parts", onPress() { if (canReset(this.layer)) doReset(this.layer) }},
    ],
    upgrades: {
        11: {
            title: "Advanced Robotics",
            description: "Enhances Junk Robot capabilities, increasing their efficiency in gathering useful scraps.",
            cost: new Decimal(20),
        },
        12: {
            title: "Efficient Automation",
            description: "Optimizes Junk Robot operations, increasing parts gathered by 10%.",
            cost: new Decimal(50),
        },
        13: {
            title: "High-Speed Scavenging",
            description: "Upgrades Junk Robots to double their scrap collection rate.",
            cost: new Decimal(100),
        },
    },
    layerShown() { return hasAchievement("a",11) },
    }
);

function getBoltGain() {
    let gain = new Decimal(1);
    gain = gain.times(player.points.times(player.j.points))
    if (hasUpgrade("w", 11)) gain = gain.times(2); // Refinery
    return gain;
}

function getPartGain() {
    let gain = new Decimal(1);
    if (hasUpgrade("w", 12)) gain = gain.times(1.1); // Optimized Production
    if (hasUpgrade("w", 13)) gain = gain.times(2); // Auto Conversion
    return gain;
}