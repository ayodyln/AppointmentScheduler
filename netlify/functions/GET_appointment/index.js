const db = require("../firestore/FirebaseApp.js")

exports.handler = async function (event) {
  const body = await JSON.parse(event.body)
  const docRef = db.collection("Appointments").doc(body.id)
  const doc = await docRef.get()

  return {
    statusCode: 200,
    body: JSON.stringify({ id: doc.id, data: doc.data() }),
  }
}
