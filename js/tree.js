const TreeManager = {
    MIN_TREES_FOR_FOREST: 100,

    calculateForestStatus(totalTrees) {
        return totalTrees >= this.MIN_TREES_FOR_FOREST;
    },

    getBackgroundClass(totalTrees) {
        return this.calculateForestStatus(totalTrees) ? 'forest-mode' : 'desert-mode';
    }
};
