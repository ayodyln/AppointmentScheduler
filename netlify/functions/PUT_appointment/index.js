const db = require("../firestore/FirebaseApp")
// Status: Completed, Cancelled, Upcoming, Overdue
exports.handler = async function (event) {
  const body = JSON.parse(event.body)
  const docRef = db.collection("Appointments").doc(body.id)
  let res
  if (body.status) {
    res = await docRef.update({ status: body.status })
    return {
      statusCode: 200,
      body: JSON.stringify({ status: body.status }),
    }
  }

  if (body.notes) {
    res = await docRef.update({ notes: body.notes })

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    }
  }

  if (body.data && !body.data.date) {
    res = await docRef.update({
      name: body.data.name,
      email: body.data.email,
      // date: body.data.date,
    })

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    }
  }

  if (body.data.date) {
    res = await docRef.update({
      date: body.data.date,
    })

    return {
      statusCode: 200,
      body: JSON.stringify(res),
    }
  }
}
