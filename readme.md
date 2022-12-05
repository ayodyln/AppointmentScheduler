# [**JavaScript Appointment Scheduler**](https://appointmentschedulerjs.netlify.app/index.html)

## **What does this app do?**

This web application gives basic appointment scheduling needs to a user. Created using `vanilla javascript`, with the primary goal to create a application that enables me to schedule appointments for myself, based on actual _dates_ & _times_.

### **Features -**

- **Create appointments with data about meeting and attendee.**
  - Appointment creation is handled by a form with an ID of `createAppointmentForm` on the [Appointments Page](https://github.com/ayodyln/AppointmentScheduler/blob/main/index.html).
  - Utilizing a `submit` [Event Listner](https://github.com/ayodyln/AppointmentScheduler/blob/main/lib/Events/CreateAppointment.js) that handles grabbing input values, running a [Fetch function](https://github.com/ayodyln/AppointmentScheduler/blob/main/lib/Handlers/Fetch.js) that POSTS my verfied data. UI updates handled here as well for User-Feedback.
- **Update metadata about appointments and save it to do the datebase.**
  - Updates are handled by multiple [Modals](https://github.com/ayodyln/AppointmentScheduler/blob/main/lib/components/Modals.js).
  - Then handled by client side [Fetch Functions](https://github.com/ayodyln/AppointmentScheduler/blob/main/lib/Handlers/Fetch.js) and [Netlify Function Endpoints](https://github.com/ayodyln/AppointmentScheduler/tree/main/netlify/functions) handle my Data manipulation with Firebase CloudStore.
- **List data to the screen from CloudStore collections: Appointments, Appointment History, and Time Availability Options.**
  - Data is listed/rendered to screen by fetching and recieving arrays from CloudStore
- **Delete Appointments from its related CloudStore collection and move that to the History collection.**
- **Toggle time availability options, which is rendered as options when creating/updating appointment times.**
- **Email a attendee from the given email, sent SendGrid.**

---

### **TechStack**

- Vanilla JavaScript
- NodeJS (Netlify Functions)
- TailwindCSS - DaisyUI
- Firebase CloudStore (NodeJS Admin SDK)
- SendGrid

Website URL: [**https://appointmentschedulerjs.netlify.app**](https://appointmentschedulerjs.netlify.app/index.html)
