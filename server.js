const app = require("./app.js");
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) {
    return console.log("Server encountered an Error :", err);
  }
  console.log(`Server is listening on localhost:${port}`);
});
