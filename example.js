const users = [
  {
    username: "nguyenvana",
    password: "123456",
  },
  {
    username: "nguyenvanb",
    password: "123456",
  },
  {
    username: "nguyenvanc",
    password: "123456",
  },
  {
    username: "nguyenvand",
    password: "123456",
  },
  {
    username: "nguyenvane",
    password: "123456",
  },
  {
    username: "nguyenvanf",
    password: "123456",
  }
]



/// login: post:  req.body: username + password: ==> find(users) ==> login thanh cong ==> username or password ....

/// register: post:  req.body: username + password: neu thieu 1/2 ==> thieu cai j return message thieu cai day



// numberMonster: quái vật
// durability: độ bền
// kUnit: độ bền giảm đi
// cGold: số vàng cần thiết


const handle = (numberMonster, durability, kUnit, cGold) => {
  if (kUnit >= durability) {
    return -1;
  }
  const max = Math.trunc(durability / kUnit);
  console.log("🚀 ~ file: index.js:6 ~ handle ~ max:", max)
  console.log("🚀 ~ file: index.js:14 ~ handle ~ numberMonster / max:", numberMonster / max)
  return Math.floor(numberMonster / max) * cGold;
};
console.log(handle(10, 5, 1, 2));
console.log(handle(10, 4, 1, 2));
