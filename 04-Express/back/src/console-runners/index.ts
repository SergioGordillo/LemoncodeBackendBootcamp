import inquirer from "inquirer";

let exit = false;

while(!exit){
    const answer = await inquirer.prompt({
        name: "consoleRunner",
        type: 'list',
        message: "Which console-runner do you want to run?",
        choices: ["create-admin", "exit"]
    });

    if(answer.consoleRunner!=="exit"){
        console.log("Create admin runner");
    }else{
        exit=true;
    }
}

