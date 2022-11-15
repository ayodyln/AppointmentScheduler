export const getAppointments = async () => {
  try {
    const res = await fetch("/get/appointments")
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

export const createAppointment = async ({ name, email, date, time, notes }) => {
  const Date_Time = new Date(`${date.value} ${time.value}`)
  try {
    await fetch("/post/appointment", {
      method: "POST",
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        date_ts: Date_Time.getTime(),
        notes: notes.value,
        status: "Upcoming",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(error)
  }
}

export const cancelAppointment = async (data) => {
  try {
    await fetch("/put/appointment/status", {
      method: "PUT",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(error)
  }
}

export const deleteAppointment = async (data) => {
  try {
    await fetch("/delete/appointment", {
      method: "DELETE",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (err) {
    console.error(err)
  }
}
