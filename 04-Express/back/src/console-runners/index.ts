import inquirer from "inquirer";

const answer = await inquirer.prompt({
  name: "user",
  type: "input",
  message: "User name:",
});
