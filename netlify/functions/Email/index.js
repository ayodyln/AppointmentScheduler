const db = require("../firestore/FirebaseApp")
const sgMail = require("@sendgrid/mail")

exports.handler = async function (event) {
  const { email_metaData } = JSON.parse(event.body)

  console.log(email_metaData)

  sgMail.setApiKey(process.env.SG_KEY)

  const msg = {
    to: email_metaData.email,
    from: `10767128@uvu.edu`,
    subject: email_metaData.subject,
    text: email_metaData.text,
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email Sent")
    })
    .catch((error) => {
      console.log(error)
    })

  return {
    statusCode: 200,
    body: JSON.stringify("Oof"),
  }
}
