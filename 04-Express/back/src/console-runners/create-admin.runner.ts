import inquirer from "inquirer";

const passwordQuestions: any = [
  {
    name: "password",
    type: "password",
    message: "Password:",
    mask: true,
  },
  {
    name: "confirmPassword",
    type: "password",
    message: "Confirm Password:",
    mask: true,
  },
];

export const run = async () => {
  const { user } = await inquirer.prompt({
    name: "user",
    type: "input",
    message: "User name:",
  });

  let passwordAnswer = await inquirer.prompt(passwordQuestions);
  while (passwordAnswer.password !== passwordAnswer.confirmPassword) {
    console.error("Password does not match, fill it again");
    passwordAnswer = await inquirer.prompt(passwordQuestions);
  }

  //TODO: Insert into DB and disconnect it
  console.log(`User ${user} created!`);
};
