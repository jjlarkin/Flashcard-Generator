/**
 *
 *
 *
 *
 */

let inquirer = require("inquirer");
let fs = require("fs");

let BasicCard = require("./Basic.js");
let ClozeCard = require("./Cloze.js");
let cards = require("./cards.json");



function createCard(){

    inquirer.prompt([
        {
            type:"list",
            message:"Create Basic or Cloze Flashcard?",
            choices:["Basic", "Cloze"],
            name:"cardChoice"
        }
    ]).then(function(data){
        let cardChoice=data.cardChoice;

        if(cardChoice ==="Basic"){
            inquirer.prompt([
                {
                    type:"input",
                    message:"Enter your card's question.",
                    name:"front"
                },
                {
                    type: "input",
                    message:"Enter your card's answer.",
                    name:"back"
                }
            ]).then(function (data){
                let newCard = {
                    type:"Basic",
                    front:data.front,
                    back:data.back
                };
                cards.push(newCard);
                fs.writeFile("cards.json", JSON.stringify(cards, null, 2));
                console.log("Success  Card created.");
                inquirer.prompt([
                {
                    type:"list",
                    message:"Continue?",
                    choices:["Yes","No"],
                    name:"callMain"
                }
                ]).then(function(data){
                if(data.callMain==="Yes") {
                    inquirerMain()
                }
                else return
                })
            });

        }
    });
}


function beginStudying(){

}


function inquirerMain() {
    inquirer.prompt([
        {
            type:"list",
            message:"Choose an option",
            choices: ["create card", "study"],
            name: "choice"
        }
    ]).then(function(answer){
        if(answer.choice==="create card"){
            createCard()
        }else if (answer.choice==="study"){
            beginStudying()
        }
    })
}
inquirerMain();