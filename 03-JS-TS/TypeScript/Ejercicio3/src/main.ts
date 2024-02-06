interface User {
  name: string;
  age: number;
  occupation?: string;
  subject?: string;
}

interface Student {
  name: string;
  age: number;
  occupation: string;
}

interface Teacher {
  name: string;
  age: number;
  subject: string;
}

const students: Student[] = [
  {
    name: "Patrick Berry",
    age: 25,
    occupation: "Medical scientist",
  },
  {
    name: "Alice Garner",
    age: 34,
    occupation: "Media planner",
  },
];

const teachers: Teacher[] = [
  {
    name: "Jane Doe",
    age: 41,
    subject: "English",
  },
  {
    name: "Bruce Willis",
    age: 39,
    subject: "Biology",
  },
];

const logUser = (user: User) => {
  let extraInfo: string;

  if ("occupation" in user) {
    extraInfo = user.occupation || "";
  } else if ("subject" in user) {
    extraInfo = user.subject || "";
  } else {
    extraInfo = "";
  }

  console.log(`  - ${user.name}, ${user.age}, ${extraInfo}`);
};

console.log("Students:");
students.forEach(logUser);

console.log("Teachers:");
teachers.forEach(logUser);
