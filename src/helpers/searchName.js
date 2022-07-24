/**
 * It takes in an array of students and a name, and returns an array of students whose first or last
 * name contains the name
 * @param studentData - The data that we're searching through.
 * @param name - The name of the student you're searching for.
 */
export const searchName = (studentData, name) => {
  console.log(studentData);
  return studentData.filter((student) =>
    `${student.firstName} ${student.lastName}`
      .toLowerCase()
      .includes(name.toLowerCase())
  );
};
