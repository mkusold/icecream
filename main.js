const program = require('commander');
const { prompt } = require("inquirer");
const flavors = require("./flavors");
const fs = require("fs");

program.version('1.0.0');

const questions = [
    {
        type: "list",
        name: "flavor",
        message: "Which flavor do you want?",
        choices: flavors
    },
    { 
        type: "number",
        name: "scoopCount",
        message: "How many scoops?",
        default: 1
    }
];

program.command("order")
.alias("o")
.description("Place an order")
.action(() => {
    console.log("=== Please Place an Order ===");
    prompt(questions).then(({flavor, scoopCount}) => {
        // print receipt
        const PRICE = 2.00
        const receipt = `
        Thanks for Eating at Scoops Ahoy.
        DATE: ${new Date().toLocaleDateString()}

        You enjoyed ${scoopCount} cone${scoopCount > 1 ? 's' : ''} of ${flavor}.
        Your total is $${PRICE.toFixed(2)}.
        ` 
        fs.writeFileSync('receipt.txt', receipt);
        console.log('Your receipt has been saved. Come again!');
    })
});

program.parse(process.argv);