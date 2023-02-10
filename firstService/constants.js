const DELAY = 3000;

const printAndWaitWithBorders = async (text) => {
  printWithBorders(text);
  await new Promise(resolve => setTimeout(resolve, DELAY));
}

const printWithBorders = (text) => {
  console.log("----------------------------");
  console.log("> ", text);
  console.log("----------------------------");
}

module.exports = { DELAY, printAndWaitWithBorders, printWithBorders };
