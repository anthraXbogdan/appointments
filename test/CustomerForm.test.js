import React from "react";
import {
    initializeReactContainer,
    render,
    element,
    form,
    field,
    click,
    submit,
    submitButton,
    change,
    labelFor
} from "./reactTestExtensions";
import { CustomerForm } from "../src/CustomerForm";

describe("CustomerForm", () => {
    const blankCustomer = {
        firstName: "",
        lastName: "",
        phoneNumber: ""
    };

    beforeEach(() => {
        initializeReactContainer();
    });

    it("renders a form", () => {
        render(<CustomerForm original={blankCustomer} />);
        expect(form()).not.toBeNull();
    });

    const itRendersAsATextBox = (fieldName) => {
        it("renders as a text box", () => {
            render(<CustomerForm original={blankCustomer} />);
            expect(field(fieldName)).not.toBeNull();
            expect(field(fieldName).tagName).toEqual("INPUT");
            expect(field(fieldName).type).toEqual("text");
        });
    };

    const itIncludesTheExistingValue = (fieldName, existing) => {
        it("includes the existing value", () => {
            const customer = { [fieldName]: existing }

            render(<CustomerForm original={customer} />);
            expect(field(fieldName).value).toEqual(existing);
        });
    };

    const itRendersALabel = (fieldName, text) => {
        it("renders a label", () => {
            render(<CustomerForm original={blankCustomer} />);
            /*
            const label = element(`label[for=${fieldName}]`);
            expect(label).not.toBeNull();
            */
            expect(labelFor(fieldName)).not.toBeNull();
        });

        it(`renders ${text} as the label content`, () => {
            render(<CustomerForm original={blankCustomer} />);
            expect(labelFor(fieldName)).toContainText(text);
        });
    };

    const itAssignsAnIdThatMatchesTheLabelId = (fieldName) => {
        it("asigns an id that matches the label id", () => {
            render(<CustomerForm original={blankCustomer} />);
            expect(field(fieldName).id).toEqual(fieldName);
        });
    };

    const itSubmitsExistingValue = (fieldName, value) => {
        it("save existing value when submitted", () => {
            expect.hasAssertions();
            const customer = { [fieldName]: value };
            render(
                <CustomerForm original={customer} onSubmit={(props) =>
                    expect(props[fieldName]).toEqual(value)}
                />
            );
            click(submitButton());
        });
    };

    const itSubmitsNewValue = (fieldName, value) => {
        it("saves new value when submitted", () => {
            expect.hasAssertions();
            render(
                <CustomerForm original={blankCustomer} onSubmit={(props) =>
                    expect(props[fieldName]).toEqual(value)} />
            );
            change(field(fieldName), value);
            click(submitButton());
        });
    };

    describe("first name field", () => {
        itRendersAsATextBox("firstName");
        itIncludesTheExistingValue("firstName", "Ashley");
        itRendersALabel("firstName", "First name");
        itAssignsAnIdThatMatchesTheLabelId("firstName");
        itSubmitsExistingValue("firstName", "Ashley");
        itSubmitsNewValue("firstName", "Jamie");
    });

    describe("last name field", () => {
        itRendersAsATextBox("lastName");
        itIncludesTheExistingValue("lastName", "Bartley");
        itRendersALabel("lastName", "Last name");
        itAssignsAnIdThatMatchesTheLabelId("lastName");
        itSubmitsExistingValue("lastName", "Bartley");
        itSubmitsNewValue("lastName", "Wilson");
    });

    describe("phone number field", () => {
        itRendersAsATextBox("phoneNumber");
        itIncludesTheExistingValue("phoneNumber", "012345");
        itRendersALabel("phoneNumber", "Phone number");
        itAssignsAnIdThatMatchesTheLabelId("phoneNumber");
        itSubmitsExistingValue("phoneNumber", "012345");
        itSubmitsNewValue("phoneNumber", "543210");
    })

    it("renders a submit button", () => {
        render(<CustomerForm original={blankCustomer} />);
        expect(submitButton()).not.toBeNull();
    });

    it("prevents the default action when submitting the form", () => {
        render(<CustomerForm original={blankCustomer} onSubmit={() => { }} />);
        const event = submit(form());
        expect(event.defaultPrevented).toBe(true);
    });


})