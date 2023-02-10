const DELAY = 3000;

const printAndWaitWithBorders = async (text) => {
  printWithBorders(text);
  await wait();
}

const printWithBorders = (text) => {
  console.log("----------------------------");
  console.log("> ", text);
  console.log("----------------------------");
}

const printAndWait = async(text) => {
  console.log("> ", text);
  await wait();
}

const wait = async () => {
  await new Promise(resolve => setTimeout(resolve, DELAY));
}

module.exports = { DELAY, printAndWaitWithBorders, printWithBorders, printAndWait };
