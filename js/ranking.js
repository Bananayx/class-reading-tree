const RankingManager = {
    getPersonalRanking(students) {
        return [...students]
            .sort((a, b) => b.trees - a.trees)
            .map(student => ({
                name: student.name,
                group: student.group,
                trees: student.trees
            }));
    },

    getGroupRanking(students) {
        const groupMap = {};
        
        students.forEach(student => {
            if (!groupMap[student.group]) {
                groupMap[student.group] = {
                    group: student.group,
                    totalTrees: 0,
                    count: 0
                };
            }
            groupMap[student.group].totalTrees += student.trees;
            groupMap[student.group].count += 1;
        });

        return Object.values(groupMap)
            .map(group => ({
                group: group.group,
                totalTrees: group.totalTrees,
                avgTrees: group.count > 0 ? group.totalTrees / group.count : 0
            }))
            .sort((a, b) => b.avgTrees - a.avgTrees);
    }
};
