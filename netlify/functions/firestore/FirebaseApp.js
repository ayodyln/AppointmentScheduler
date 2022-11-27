const admin = require("firebase-admin")
const key = require("./serviceKey.js")
admin.initializeApp({
  credential: admin.credential.cert(key),
})

const db = admin.firestore()

module.exports = db
