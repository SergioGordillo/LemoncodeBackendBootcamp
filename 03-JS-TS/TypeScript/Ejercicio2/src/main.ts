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

const logUser = ({ name, age, occupation, subject }: User) => {
  console.log(`  - ${name}, ${age}`);
  if (occupation) {
    console.log(`    Occupation: ${occupation}`);
  }
  if (subject) {
    console.log(`    Subject: ${subject}`);
  }
};

console.log("Students:");
students.forEach(logUser);

console.log("Teachers:");
teachers.forEach(logUser);
