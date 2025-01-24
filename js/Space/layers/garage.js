addLayer("g", {
    name: "Garage",
    symbol: "G",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0), // Accumulated Parts
    }},
    color: "#00ccff",
    requires: new Decimal(500), // Requires 500 Energy to unlock
    resource: "Parts", 
    baseResource: "Bolts",
    baseAmount() { return player.points.times(player.j.points) }, // Depends on Energy
    type: "normal",
    exponent: 0.5,
    gainMult() {
        let mult = new Decimal(1);
        if (hasUpgrade("g", 11)) mult = mult.times(1.1); // Optimized Production
        return mult;
        },
    gainExp() { return new Decimal(1) },
    row: 1,
    hotkeys: [
        { key: "g", description: "G: Collect Parts", onPress() { if (canReset(this.layer)) doReset(this.layer) }},
    ],
    upgrades: {
        11: {
            title: "Refinery",
            description: "Increase the bolt production.",
            cost: new Decimal(100),
        },
        12: {
            title: "Optimized Production",
            description: "Increases Parts gained by 10%.",
            cost: new Decimal(250),
        },
        13: {
            title: "Auto Conversion",
            description: "Doubles conversions.",
            cost: new Decimal(500),
        },
    },
    layerShown() { return hasMilestone("j", 0) } // Visible after accumulating 500 Energy{ return hasMilestone("j", 0) } // Visible après avoir accumulé 500 Énergies
    }
);

function getBoltGain() {
    let gain = new Decimal(1);
    gain = gain.times(player.points.times(player.j.points))
    if (hasUpgrade("g", 11)) gain = gain.times(2); // Refinery
    return gain;
}

function getPartGain() {
    let gain = new Decimal(1);
    if (hasUpgrade("g", 12)) gain = gain.times(1.1); // Optimized Production
    if (hasUpgrade("g", 13)) gain = gain.times(2); // Auto Conversion
    return gain;
}