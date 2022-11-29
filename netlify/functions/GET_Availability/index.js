const db = require("../firestore/FirebaseApp.js")

exports.handler = async function (event) {
  const docRef = db.collection("AvailableTimes").doc("Hours")
  const doc = await docRef.get()

  return {
    statusCode: 200,
    body: JSON.stringify({ id: doc.id, data: doc.data().options }),
  }
}
