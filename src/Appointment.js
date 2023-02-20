import React from "react";

export const Appointment = (props) => {
   const { customer } = props;

   return <div>{customer.firstName}</div>;
};
