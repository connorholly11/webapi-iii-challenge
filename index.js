// code away!
require("dotenv").config();
const defaults = require("./configs/defaults");

const server = require("./server");

console.log(defaults.port);

server.listen(defaults.port, () => {
  console.log(`api running on port ${defaults.port}`);
});
