const db = require("../firestore/FirebaseApp")
// Status: Completed, Cancelled, Upcoming, Overdue
exports.handler = async function (event) {
  const body = JSON.parse(event.body)
  const docRef = db.collection("Appointments").doc(body.id)
  let res

  if (body.status) {
    console.log(body.status)
    res = await docRef.update({ status: body.status })
  }

  if (body.notes) {
    console.log(body.notes)
    res = await docRef.update({ notes: body.notes })
  }

  return {
    statusCode: 200,
    body: JSON.stringify(res),
  }
}
