import React from "react";
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Appointment } from "../src/Appointment";

describe("Appointment", () => {
   let container;

   beforeEach(() => {
      container = document.createElement("div");
      document.body.replaceChildren(container);
   });

   const render = (component) => {
      act(() => {
         ReactDOM.createRoot(container).render(component);
      });
   };

   it("renders the customer first name", () => {
      const customer = { firstName: "Ashley" };
      const component = <Appointment customer={customer} />;

      render(component);
      expect(document.body.textContent).toContain("Ashley");
   });

   it("renders another customer first name", () => {
      const customer = { firstName: "Jordan" };
      const component = <Appointment customer={customer} />;

      render(component);
      expect(document.body.textContent).toContain("Jordan");
   });
});
