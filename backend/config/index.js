const mongoose = require("mongoose");

const URI = `${process.env.MONGODB_URI}/Vizport`;
console.log(URI);

mongoose.connect(URI).then(() => console.log("DB Connected!")).catch((error) => {
    console.log(error);
})