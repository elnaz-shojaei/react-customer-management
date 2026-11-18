import { beforeEach, describe, it, expect, vi } from "vitest";
import {render, screen} from "@testing-library/react";
import CustomerCard from "./CustomerCard";
import type {Customer} from "./type/customer";
import userEvent from "@testing-library/user-event";


const customer: Customer = {
    name: "Mobina",
    family: "Alinezhad",
    company: "shakhsi",
    email:"mobina.alinezhad@gmail.com",
    phone:"09151234526",
    isActive: true,
}

beforeEach(() => {
  vi.clearAllMocks();
});

const onToggleStatus = vi.fn();
const onDeleteCustomers = vi.fn();

it("should render customer information", () => {
    render (
        <CustomerCard
            customer={customer}
            onToggleStatus={onToggleStatus}
            onDeleteCustomers={onDeleteCustomers}
        />
    )
    expect(screen.getByText("Mobina")).toBeInTheDocument();
    expect(screen.getByText("mobina.alinezhad@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("shakhsi")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
});

it("should call onToggleStatus when button is clicked", async () => {
    const user = userEvent.setup();
    render (
        <CustomerCard
            customer={customer}
            onToggleStatus={onToggleStatus}
            onDeleteCustomers={onDeleteCustomers}
        />
    )

    const toggleButton = screen.getByRole("button", {name: "Toggle Status", })
    await user.click(toggleButton);
    expect(onToggleStatus).toHaveBeenCalledWith(customer.email)
});

it("should show and hide customer details when buttons are clicked", async () => {
    const user = userEvent.setup();
    render (
        <CustomerCard
            customer={customer}
            onToggleStatus={onToggleStatus}
            onDeleteCustomers={onDeleteCustomers}
        />
    )

    expect(screen.queryByText("Alinezhad")).not.toBeInTheDocument();
    const showDetails = screen.getByRole("button", {name: "Show Details"});
    await user.click(showDetails);
    expect(screen.getByText("Alinezhad")).toBeInTheDocument();
    const hideDetails = screen.getByRole("button", {name: "Hide Details"});
    await user.click(hideDetails);
    expect(screen.queryByText("Alinezhad")).not.toBeInTheDocument();
});

it("should disable delete button for active customer", () => {
    render (
        <CustomerCard
            customer={customer}
            onToggleStatus={onToggleStatus}
            onDeleteCustomers={onDeleteCustomers}
        />
    )
    expect(screen.getByRole("button", {name: "Delete Customer"})).toBeDisabled();
});

const inactiveCustomer: Customer = {
     ...customer,
     isActive: false,
}

it("should enable delete button for inactive customer", () => {
    render (
        <CustomerCard
            customer={inactiveCustomer}
            onToggleStatus={onToggleStatus}
            onDeleteCustomers={onDeleteCustomers}
        />
    )
    expect(screen.getByRole("button", {name: "Delete Customer"})).toBeEnabled();

});

beforeEach(() => {
  vi.clearAllMocks();
});

it("should call onDeleteCustomers when delete button is clicked", async () => {
    const user = userEvent.setup();
    render (
        <CustomerCard
            customer={inactiveCustomer}
            onToggleStatus={onToggleStatus}
            onDeleteCustomers={onDeleteCustomers}
        />
    )
    const deleteCustomer = screen.getByRole("button", {name: "Delete Customer"});
    await user.click(deleteCustomer);
    expect(onDeleteCustomers).toHaveBeenCalledWith(inactiveCustomer.email)
});

beforeEach(() => {
  vi.clearAllMocks();
});

it("shouldn't call onDeleteCustomers when customer is active", async () => {
    const user = userEvent.setup();
    render (
        <CustomerCard
            customer={customer}
            onToggleStatus={onToggleStatus}
            onDeleteCustomers={onDeleteCustomers}
        />
    )
    const deleteCustomer = screen.getByRole("button", {name: "Delete Customer"});
    await user.click(deleteCustomer);
    expect(onDeleteCustomers).not.toHaveBeenCalledWith();
});

const newCustomer: Customer = {
    ...customer,
    phone: undefined,
}

beforeEach(() => {
  vi.clearAllMocks();
});

it("should not display phone when customer has no phone number", () => {
    render (
        <CustomerCard
            customer={newCustomer}
            onToggleStatus={onToggleStatus}
            onDeleteCustomers={onDeleteCustomers}
        />
    )
    expect(screen.queryByText("09151234526")).not.toBeInTheDocument();
})

beforeEach(() => {
    vi.clearAllMocks();
});

it("should show inactive customer status", () => {
    render (
        <CustomerCard
            customer={inactiveCustomer}
            onToggleStatus={onToggleStatus}
            onDeleteCustomers={onDeleteCustomers}
        />
    )
    expect(screen.queryByText("Active")).not.toBeInTheDocument();
    expect(screen.queryByText("Inactive")).toBeInTheDocument();
})


it("toggle status button should call one time", async ()  => {
    //Arrange
    const user = userEvent.setup();
    render (
        <CustomerCard
            customer={customer}
            onToggleStatus={onToggleStatus}
            onDeleteCustomers={onDeleteCustomers}
        />
    )

    const showDetails = screen.getByRole("button", {name: "Toggle Status"});
    //Act
    await user.click(showDetails)
    //Assert
    expect(onToggleStatus).toHaveBeenCalled();
    expect(onToggleStatus).toHaveBeenCalledWith(customer.email);
})

