const db = require("../firestore/FirebaseApp")
// Status: Completed, Cancelled, Upcoming, Overdue
exports.handler = async function (event) {
  const body = JSON.parse(event.body)
  const docRef = db.collection("Appointments").doc(body.id)
  const res = await docRef.update({ status: body.status })

  return {
    statusCode: 200,
    body: JSON.stringify(res),
  }
}
