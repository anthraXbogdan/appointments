import React, { useState } from "react";

const appointmentTimeOfDay = (startAt) => {
   const [h, m] = new Date(startAt).toTimeString().split(":");
   return `${h}:${m}`;
};

export const Appointment = (props) => {
   const { startsAt, customer, stylist, service, notes } = props;

   return (
      <div id="appointmentView">
         <h3>Today's appointment at {appointmentTimeOfDay(startsAt)}</h3>

         <table>
            <tbody>
               <tr>
                  <td>Customer</td>
                  <td>{`${customer.firstName} ${customer.lastName}`}</td>
               </tr>
               <tr>
                  <td>Phone number</td>
                  <td>{customer.phoneNumber}</td>
               </tr>
               <tr>
                  <td>Stylist</td>
                  <td>{stylist}</td>
               </tr>
               <tr>
                  <td>Service</td>
                  <td>{service}</td>
               </tr>
               <tr>
                  <td>Notes</td>
                  <td>{notes}</td>
               </tr>
            </tbody>
         </table>
      </div>
   );
};

export const AppointmentsDayView = (props) => {
   const { appointments } = props;
   const [selectedAppointment, setSelectedAppointment] = useState(0);

   return (
      <div id="appointmentsDayView">
         <ol>
            {appointments.map((appointment, i) => (
               <li key={appointment.startsAt}>
                  <button
                     type="button"
                     onClick={() => setSelectedAppointment(i)}
                  >
                     {appointmentTimeOfDay(appointment.startsAt)}
                  </button>
               </li>
            ))}
         </ol>

         {appointments.length === 0 ? (
            <p>There are no appointments scheduled for today.</p>
         ) : (
            <Appointment {...appointments[selectedAppointment]} />
         )}
      </div>
   );
};
