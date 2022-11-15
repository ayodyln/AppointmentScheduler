const db = require("../firestore/FirebaseApp.js")

exports.handler = async function (event) {
  const { name, email, date_ts, notes, status } = await JSON.parse(event.body)
  const docRef = db.collection("Appointments").doc()
  const data = await docRef.set({
    name: name,
    email: email,
    date: date_ts,
    notes: notes,
    status: status,
  })

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}
