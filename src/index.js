import React from "react";
import ReactDOM from "react-dom/client";
import { AppointmentsDayView } from "./AppointmentsDayView";
import { CustomerForm } from "./CustomerForm";
import { sampleAppointments } from "./sampleData";

const blankCustomer = {
   firstName: "Ashley",
   lastName: "Donovan",
   phoneNumber: "333-444-555"
};

ReactDOM.createRoot(document.getElementById("root")).render(
   // <AppointmentsDayView appointments={sampleAppointments} />
   <CustomerForm original={blankCustomer} onSubmit={() => { }} />
);
