const db = require("../firestore/FirebaseApp.js")

exports.handler = async function (event) {
  const body = JSON.parse(event.body)
  const currentReference = body.current

  const ref = db.collection("AvailableTimes").doc(body.id)

  const res = await ref.update({
    active: currentReference.body.active ? false : true,
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: `Toggled Time slot ${currentReference.body.time} (${body.id})`,
      timeStatus: !currentReference.body.active,
    }),
  }
}
