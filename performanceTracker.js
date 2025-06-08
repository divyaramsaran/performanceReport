const topper = (top, newStudent) => {
  const topAverage = top.at(2);
  const studentAverage = newStudent.at(2);

  if (studentAverage > topAverage) {
    return newStudent;
  }

  return top;
};

const toppersArray = (topArray, newStudent) => {
  const topAverage = topArray.at(-1).at(2);
  const studentAverage = newStudent.at(2);

  const topperRollNo = topArray.at(-1).at(1);
  const studentRollNo = newStudent.at(1);

  if (studentAverage === topAverage && topperRollNo !== studentRollNo) {
    topArray.push(newStudent);
  }

  return topArray;
};

const calcGrade = (avg) => {
  if (avg > 90 && avg < 100) return "Grade A";
  else if (avg > 80 && avg < 90) return "Grade B";
  else if (avg > 60 && avg < 70) return "Grade D";
  else if (avg > 70 && avg < 80) return "Grade C";
  else if (avg > 50 && avg < 100) return "Grade E";
  else return "Grade F";
};

const calcAverage = (marks) => {
  return (
    Object.values(marks).reduce(
      (marks, preSubjectMarks) => marks + preSubjectMarks
    ) / 3
  );
};

const studentReport = (data) => {
  const report = [];
  report.push(data.name);
  report.push(data.rollNo);
  const average = Number(calcAverage(data.marks).toFixed(2));
  report.push(average);
  report.push(calcGrade(average));

  return report;
};

const nameWithAvg = (topperReport) => {
  return {
    name: topperReport.at(0),
    avg: topperReport.at(2),
  };
};

const subjectToppers = ([topPerson, subject], student) => {
  const topMarks = topPerson[0].marks[subject];
  if (
    topMarks === student.marks[subject] &&
    topPerson[0].rollNo !== student.rollNo
  ) {
    topPerson.push(student);

    return [topPerson, subject];
  }

  return [topPerson, subject];
};

const topStudent = ({ topPerson, subject }, student) => {
  if (topPerson.marks[subject] < student.marks[subject]) {
    return { topPerson: student, subject };
  }

  return { topPerson, subject };
};

const extractSubjectToppers = (entries, subject) => {
  const { topPerson } = entries.reduce(topStudent, {
    topPerson: entries[0],
    subject,
  });

  return entries.reduce(subjectToppers, [[topPerson], subject]);
};

const finalStudentReport = (report) => {
  return (
    report[0] +
    " (Roll No: " +
    report[1] +
    ") " +
    "- Avg: " +
    report[2] +
    " - " +
    report[3]
  );
};

const studentAndAvg = (student) => {
  return student.name + " (Avg: " + student.avg + ")";
};

const eachSubToppers = ([students, subject]) => {
  const topStudents = students.map(
    (student) => student.name + " (" + student.marks[subject] + ")"
  );

  return subject + ": " + topStudents;
};

const finalTemplate = (
  report,
  topStudentsWithAvg,
  failedStudentsWithAvg,
  subjectWiseToppers
) => {
  console.log("----- Student Performance Report -----");
  console.log(report.map(finalStudentReport).join("\n"));
  console.log("\n----- Top Performer(s) -----");
  console.log(topStudentsWithAvg.map(studentAndAvg).join("\n"));
  console.log("\n----- Failed Student(s) -----");
  console.log(failedStudentsWithAvg.map(studentAndAvg).join("\n"));
  console.log("\n----- Subject-wise Toppers -----");
  console.log(
    subjectWiseToppers.map((students) => eachSubToppers(students)).join("\n")
  );
};

const result = (data) => {
  const report = data.map(studentReport);
  const classTopper = report.reduce(topper, report[0]);
  const classTopperArray = report.reduce(toppersArray, [classTopper]);
  const topStudentsWithAvg = classTopperArray.map(nameWithAvg);
  const failedStudents = report.filter((student) => student.at(2) < 50);
  const failedStudentsWithAvg = failedStudents.map(nameWithAvg);
  const entries = data.map((entry) => entry);
  const subjects = ["Math", "Science", "English"];
  const subjectWiseToppers = subjects.map((subject) =>
    extractSubjectToppers(entries, subject)
  );

  finalTemplate(
    report,
    topStudentsWithAvg,
    failedStudentsWithAvg,
    subjectWiseToppers
  );
};

const data = [
  {
    name: "Alice",
    rollNo: 101,
    marks: {
      Math: 95,
      Science: 88,
      English: 91,
    },
  },
  {
    name: "Bob",
    rollNo: 102,
    marks: {
      Math: 40,
      Science: 35,
      English: 42,
    },
  },
  {
    name: "Charlie",
    rollNo: 103,
    marks: {
      Math: 78,
      Science: 85,
      English: 80,
    },
  },
];

console.log(result(data));
