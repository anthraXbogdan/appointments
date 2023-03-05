import React, { useState } from "react";

const appointmentTimeOfDay = (startAt) => {
   const [h, m] = new Date(startAt).toTimeString().split(":");
   return `${h}:${m}`;
};

export const Appointment = (props) => {
   const { customer } = props;

   return <div>{customer.firstName}</div>;
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