const db = require("../firestore/FirebaseApp.js")

exports.handler = async function (event) {
  let data = []
  const snapshot = await db.collection("Appointments").get()
  snapshot.forEach((doc) => data.push({ id: doc.id, data: doc.data() }))

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
