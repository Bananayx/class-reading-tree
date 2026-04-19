const StudentManager = {
    defaultStudents: [
        { group: '第一组', name: '张三', trees: 0 },
        { group: '第一组', name: '李四', trees: 0 },
        { group: '第一组', name: '王五', trees: 0 },
        { group: '第二组', name: '赵六', trees: 0 },
        { group: '第二组', name: '钱七', trees: 0 },
        { group: '第二组', name: '刘八', trees: 0 }
    ],

    loadStudents() {
        const stored = localStorage.getItem('students');
        if (stored) {
            return JSON.parse(stored);
        }
        this.saveStudents(this.defaultStudents);
        return this.defaultStudents;
    },

    saveStudents(students) {
        localStorage.setItem('students', JSON.stringify(students));
    },

    resetStudents() {
        this.saveStudents(this.defaultStudents);
    },

    adjustTree(index, delta) {
        const students = this.loadStudents();
        if (index >= 0 && index < students.length) {
            students[index].trees += delta;
            if (students[index].trees < 0) {
                students[index].trees = 0;
            }
            this.saveStudents(students);
        }
    },

    parseImportText(text) {
        const students = [];
        const lines = text.trim().split('\n');
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;
            
            const match = trimmedLine.match(/^(.+?)[:：](.+)$/);
            if (!match) continue;
            
            const group = match[1].trim();
            const namesStr = match[2].trim();
            const names = namesStr.split(/[,，]/).map(n => n.trim()).filter(n => n);
            
            for (const name of names) {
                students.push({
                    group: group,
                    name: name,
                    trees: 0
                });
            }
        }
        
        return students;
    }
};
