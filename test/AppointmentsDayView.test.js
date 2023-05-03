import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";

describe("Appointment", () => {
   let container;

   beforeEach(() => {
      container = document.createElement("div");
      document.body.replaceChildren(container);
   });

   const blankCustomer = {
      firstName: "",
      lastName: "",
      phoneNumber: ""
   }

   const render = (component) => {
      act(() => {
         ReactDOM.createRoot(container).render(component);
      });
   };

   const appointmentTable = () => {
      return document.querySelector("#appointmentView > table");
   }

   it("renders a div with the right id", () => {
      render(<Appointment customer={blankCustomer} />);
      expect(document.querySelector("div#appointmentView")).not.toBeNull();
   })

   it("renders an h3 heading to display the appointment time", () => {
      const today = new Date();
      const startsAt = today.setHours(12, 0);

      render(<Appointment startsAt={startsAt} customer={blankCustomer} />)

      const heading = document.querySelector("h3");
      expect(heading).not.toBeNull();
      expect(heading.textContent).toEqual("Today's appointment at 12:00")
   });

   it("renders a table", () => {
      render(<Appointment customer={blankCustomer} />);
      const table = document.querySelector("#appointmentView > table");
      expect(appointmentTable()).not.toBeNull();
   })

   it("renders the customer first name", () => {
      const customer = { firstName: "Ashley" };

      render(<Appointment customer={customer} />);
      expect(appointmentTable().textContent).toContain(
         "Ashley"
      );
   });

   it("renders another customer first name", () => {
      const customer = { firstName: "Jordan" };

      render(<Appointment customer={customer} />);
      expect(document.body.textContent).toContain("Jordan");
   });

   it("renders the customer last name", () => {
      const customer = { lastName: "Bartley" };

      render(<Appointment customer={customer} />);
      expect(appointmentTable().textContent).toContain("Bartley");
   });

   it("renders another customer last name", () => {
      const customer = { lastName: "Smith" };

      render(<Appointment customer={customer} />);
      expect(appointmentTable().textContent).toContain("Smith");
   })

   it("renders the customer phone number", () => {
      const customer = { phoneNumber: "333 123-1234" };

      render(<Appointment customer={customer} />)
      expect(appointmentTable().textContent).toContain("333 123-1234");
   })

   it("renders another customer phone number", () => {
      const customer = { phoneNumber: "555 555-5555" };

      render(<Appointment customer={customer} />);
      expect(appointmentTable().textContent).toContain("555 555-5555");
   });

   it("renders the stylist name", () => {
      render(<Appointment customer={blankCustomer} stylist="Michaela" />);
      expect(appointmentTable().textContent).toContain("Michaela");
   });

   it("renders another stylist name", () => {
      render(<Appointment customer={blankCustomer} stylist="Sami" />);
      expect(appointmentTable().textContent).toContain("Sami");
   });

   it("renders the saloon service", () => {
      render(<Appointment customer={blankCustomer} service="Beard trim" />);
      expect(appointmentTable().textContent).toContain("Beard trim");
   });

   it("renders another saloon service", () => {
      render(<Appointment customer={blankCustomer} service="Extensions" />);
      expect(appointmentTable().textContent).toContain("Extensions");
   });

   it("renders the appointment notes", () => {
      render(<Appointment customer={blankCustomer} notes="abcdef" />);
      expect(appointmentTable().textContent).toContain("abcdef");
   });

   it("renders another appointment notes", () => {
      render(<Appointment customer={blankCustomer} notes="ghijkl" />);
      expect(appointmentTable().textContent).toContain("ghijkl");
   });
});

describe("AppointmentsDayView", () => {
   let container;

   const today = new Date();
   const twoAppointments = [
      { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
      { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
   ];

   beforeEach(() => {
      container = document.createElement("div");
      document.body.replaceChildren(container);
   });

   const render = (component) => {
      act(() => {
         ReactDOM.createRoot(container).render(component);
      });
   };

   it("renders a div with the right id", () => {
      render(<AppointmentsDayView appointments={[]} />);
      expect(document.querySelector("div#appointmentsDayView")).not.toBeNull();
   });

   it("renders an ol element to display appointments", () => {
      render(<AppointmentsDayView appointments={[]} />);
      const listElement = document.querySelector("ol");
      expect(listElement).not.toBeNull();
   });

   it("renders an li for each appointment", () => {
      render(<AppointmentsDayView appointments={twoAppointments} />);
      const listChildren = document.querySelectorAll("ol > li");
      expect(listChildren).toHaveLength(2);
   });

   it("renders the time of each appointment", () => {
      render(<AppointmentsDayView appointments={twoAppointments} />);
      const listChildren = document.querySelectorAll("li");
      expect(listChildren[0].textContent).toEqual("12:00");
      expect(listChildren[1].textContent).toEqual("13:00");
   });

   it("initially shows a message saying there are no appointments today", () => {
      render(<AppointmentsDayView appointments={[]} />);
      expect(document.body.textContent).toContain(
         "There are no appointments scheduled for today."
      );
   });

   it("selects the first appointment by default", () => {
      render(<AppointmentsDayView appointments={twoAppointments} />);
      expect(document.body.textContent).toContain("Ashley");
   });

   it("has a button element in each li", () => {
      render(<AppointmentsDayView appointments={twoAppointments} />);

      const buttons = document.querySelectorAll("li > button");
      expect(buttons).toHaveLength(2);
      expect(buttons[0].type).toEqual("button");
   });

   it("renders another appointment when selected", () => {
      render(<AppointmentsDayView appointments={twoAppointments} />);

      const button = document.querySelectorAll("button")[1];
      act(() => button.click());
      expect(document.body.textContent).toContain("Jordan");
   });
});
