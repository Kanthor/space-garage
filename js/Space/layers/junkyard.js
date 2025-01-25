
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
            cost: new Decimal(2),
        },
        12: {
            title: "Sorting Bins",
            description: "Organize your useful scraps, increasing their gain amount by 25%.",
            cost: new Decimal(5),
        },
        13: {
            title: "Scrap Detector",
            description: "Helps locate useful scraps, doubling your scrap gain.",
            cost: new Decimal(10),
        },
        21: {
            title: "Shovel",
            description: "Dig up scraps from the ground, increasing your scrap gain by 100%.",
            cost: new Decimal(2),
        },
        22: {
            title: "Garbage Truck",
            description: "Vroom Vroom, more scraps!",
            cost: new Decimal(10),
        },
        23: {
            title: "Crane",
            description: "Lift up scraps from the ground, increasing your scrap gain by 100%.",
            cost: new Decimal(20),
        },
        31: {
            title: "Robot mode : Recycler",
            description: "Recycle your scraps, increasing your scrap gain by 100%.",
            cost: new Decimal(100),
            unlocked() { return hasAchievement('a', 11) }
        },
        32: {
            title: "Robot mode : Sorter",
            description: "Automatically sorts your scraps, increasing your scrap gain by 100%.",
            cost: new Decimal(400),
            unlocked() { return hasAchievement('a', 11) }
        },
        33: {
            title: "Robot mode : Preserver",
            description: "Robots does not destroy your upgrades anymore.",
            cost: new Decimal(1000),
            unlocked() { return hasAchievement('a', 11) }

        },

        // 22: {
        //     title: "Garbage Truck",
        //     description: "Vroom Vroom, more scraps!",
        //     cost: new Decimal(1000),
        //     effect() {
        //         return player[this.layer].points.add(1).pow(0.5)
        //     },
        //     effectDisplay() {
        //          return format(upgradeEffect(this.layer, this.id))+"x"
        //     },
        // },
    },
    doReset(resettingLayer) {
        // Personnalisation lors d'un reset
        if (resettingLayer == "w")
        {
            if (hasUpgrade('j', 33))
            {
                layerDataReset(this.layer, ["upgrades"])
            }
            else
            {
                layerDataReset(this.layer, []);
            }
        }

    },
    passiveGeneration() {
        return hasUpgrade('w', 21) ? 1 : 0;
    }
})

function getUsefulScrapGain() {
    let gain = new Decimal(1) // Base gain

    // gain are already affected by the workshop layer (number of robots)
    gain = gain.add(player.w.points)

    // Apply upgrades
    if (hasUpgrade('j', 11)) gain = gain.times(1.5)
    if (hasUpgrade('j', 12)) gain = gain.times(1.25)
    if (hasUpgrade('j', 13)) gain = gain.times(2)


    return gain
}

function getScrapGain()
{
    let gain = player.points.times(2)

    if (hasUpgrade('j', 21)) gain = gain.times(2)
    if (hasUpgrade('j', 22)) gain = gain.times(2)
    if (hasUpgrade('j', 23)) gain = gain.times(2)

    if (hasUpgrade('j', 31)) gain = gain.times(2)
    if (hasUpgrade('j', 32)) gain = gain.times(4)

    return gain
}
