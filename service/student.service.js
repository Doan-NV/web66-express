
const data = [
  {
    id: 1,
    name: "nguyen van a",
    age: 25
  },
  {
    id: 2,
    name: "nguyen van a",
    age: 26
  },
  {
    id: 3,
    name: "nguyen van c",
    age: 24
  }
]
const findStudentByName = (name) => { // crud
  const student = data.filter((item) => {
    return item.name === name;
  });
  return student;
};

module.exports ={
  findStudentByName,
}