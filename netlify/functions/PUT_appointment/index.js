const db = require("../firestore/FirebaseApp.js")

exports.handler = async function (event) {
  console.log(event.body)
  return {
    statusCode: 200,
    body: JSON.stringify("Hello World"),
  }
}
