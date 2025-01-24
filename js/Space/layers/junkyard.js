
addLayer("j", {
    name: "junkyard", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "J", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "useful scraps", // Name of prestige currency
    baseResource: "scraps", // Name of resource prestige is based on
    baseAmount() {return getScrapGain()}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        return getUsefulScrapGain()
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Scrap Magnet",
            description: "Attracts nearby useful scraps, increasing collection rate by 50%.",
            cost: new Decimal(5),
        },
        12: {
            title: "Sorting Bins",
            description: "Organize your useful scraps, increasing their value by 25%.",
            cost: new Decimal(10),
        },
        13: {
            title: "Scrap Detector",
            description: "Helps locate useful scraps, doubling your scrap gain.",
            cost: new Decimal(15),
        },
        21: {
            title: "Shovel",
            description: "Dig up scraps from the ground, increasing your scrap gain by 100%.",
            cost: new Decimal(5),
        },
        22: {
            title: "Garbage Truck",
            description: "Vroom Vroom, increasing your scrap based on your useful scraps.",
            cost: new Decimal(10),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() {
                 return format(upgradeEffect(this.layer, this.id))+"x" 
            },
        },
    },
    // doReset(resettingLayer) {
    //     // Personnalisation lors d'un reset
    //     if (resettingLayer == "g") return;
    //     layerDataReset(this.layer, ["upgrades"]);
    // },
    milestones: {
        0: {
            requirementDescription: "20 useful scraps in storage",
            effectDescription: "Unlock garage.",
            done() { return player.j.points.gte(20) }, // Vérifie si le joueur a atteint l'objectif
        },
    }
})

function getUsefulScrapGain() {
    let gain = new Decimal(1) // Base gain
    
    // Apply upgrades
    if (hasUpgrade('j', 11)) gain = gain.times(1.5)
    if (hasUpgrade('j', 12)) gain = gain.times(1.25)
    if (hasUpgrade('j', 13)) gain = gain.times(2)
    
    return gain
}

function getScrapGain()
{
    let gain = player.points

    if (hasUpgrade('j', 21)) gain = gain.times(2)
    if (hasUpgrade('j', 22)) gain = gain.times(upgradeEffect('j', 22))

    return gain
}
