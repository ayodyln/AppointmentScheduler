export const dateComparing = async (appointment) => {
  const appointmentDate = new Date(appointment)

  const currentDate = new Date()
  //   currentDate.setMinutes(0)
  //   currentDate.setSeconds(0)
  //   currentDate.setMilliseconds(0)

  const compareDate = new Date()
  compareDate.setHours(appointmentDate.getHours() + 1)
  compareDate.setMinutes(0)
  compareDate.setSeconds(0)
  compareDate.setMilliseconds(0)

  return { appointmentDate, currentDate, compareDate }
}
