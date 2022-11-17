const db = require("../firestore/FirebaseApp.js")

exports.handler = async function (event) {
  const id = event.queryStringParameters.id
  const docRef = db.collection("Appointments").doc(id)
  const doc = await docRef.get()

  return {
    statusCode: 200,
    body: JSON.stringify({ id: doc.id, data: doc.data() }),
  }
}
