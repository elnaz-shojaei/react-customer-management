import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect, vi, afterEach } from "vitest";
import * as customerService from "./services/customer.service";
import App from "./App";

it("should filter customer by search field", async () => {
    const user = userEvent.setup();
    render (
        <App/>
    )
    await screen.findByText("Ali", {}, { timeout: 3000 });
    const searchInput = screen.getByPlaceholderText("Search customers...");
    await user.type(searchInput, "Ali");
    expect(screen.getByText("Ali")).toBeInTheDocument();
    expect(screen.queryByText("Elnaz")).not.toBeInTheDocument();
    expect(screen.queryByText("Mohamad")).not.toBeInTheDocument();
});

it("should filter inactive customer", async () => {
    const user = userEvent.setup();
    render (
        <App/>
    )
    await screen.findByText("Ali", {}, { timeout: 3000 });
    const inactiveButton = screen.getByRole("radio", {name: "Inactive"});
    await user.click(inactiveButton);
    expect(screen.getByText("Ali")).toBeInTheDocument();
    expect(screen.queryByText("Elnaz")).not.toBeInTheDocument();
    expect(screen.getByText("Mohamad")).toBeInTheDocument();
});

it("should filter inactive customers by search term", async () => {
    const user = userEvent.setup();
    render (
        <App/>
    )
    await screen.findByText("Ali", {}, { timeout: 3000 });
    const inactiveButton = screen.getByRole("radio", {name: "Inactive"});
    const searchInput = screen.getByPlaceholderText("Search customers...");
    await user.click(inactiveButton);
    await user.type(searchInput, "Ali");
    expect(screen.getByText("Ali")).toBeInTheDocument();
    expect(screen.queryByText("Elnaz")).not.toBeInTheDocument();
    expect(screen.queryByText("Mohamad")).not.toBeInTheDocument();
});

it("should delete customer when user confirms", async () => {
    const user = userEvent.setup();
    const confirmSpy = vi.spyOn(window, "confirm");
    confirmSpy.mockReturnValue(true);
    render (
        <App />
    )
    await screen.findByText("Ali", {}, { timeout: 3000 });
    const customerName = screen.getByText("Ali");
    const customerCard = customerName.closest("div");
    const deleteButton = within(customerCard!).getByRole("button", {
        name: "Delete Customer"
    });
    await user.click(deleteButton);
    expect(screen.queryByText("Ali")).not.toBeInTheDocument();
    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(confirmSpy).toHaveBeenCalledWith(
    "Are you sure you want to delete this customer?"
    );
});

afterEach(() => {
  vi.restoreAllMocks();
});

it("shouldn't delete customer when user does not confirms", async () => {
    const user = userEvent.setup();
    const confirmSpy = vi.spyOn(window, "confirm");
    confirmSpy.mockReturnValue(false);
    render (
        <App />
    )
    await screen.findByText("Ali", {}, { timeout: 3000 });
    const customerName = screen.getByText("Ali");
    const customerCard = customerName.closest("div");
    const deleteButton = within(customerCard!).getByRole("button", {
        name: "Delete Customer"
    });
    await user.click(deleteButton);
    expect(screen.queryByText("Ali")).toBeInTheDocument();
    expect(confirmSpy).toHaveBeenCalledTimes(1);
    expect(confirmSpy).toHaveBeenCalledWith(
    "Are you sure you want to delete this customer?"
    );
});

it("press toggle status and active or inactive customer", async () => {
    const user = userEvent.setup();
    render (
        <App />
    )
    await screen.findByText("Ali", {}, { timeout: 3000 });
    const customerName = screen.getByText("Ali");
    const customerCard = customerName.closest("div");
    const toggleStatus = within(customerCard!).getByRole("button", {name: "Toggle Status"});
    await user.click(toggleStatus);
    expect(within(customerCard!).getByText("Active")).toBeInTheDocument();
    expect(within(customerCard!).queryByText("Inactive")).not.toBeInTheDocument();
});

it("should toggle customer status from active to inactive", async () => {
    const user = userEvent.setup();
    render (
        <App />
    )
    await screen.findByText("Elnaz", {}, { timeout: 3000 });
    const customerName = screen.getByText("Elnaz");
    const customerCard = customerName.closest("div");
    const toggleStatus = within(customerCard!).getByRole("button", {name: "Toggle Status"});
    await user.click(toggleStatus);
    expect(within(customerCard!).getByText("Inactive")).toBeInTheDocument();
    expect(within(customerCard!).queryByText("Active")).not.toBeInTheDocument();
});


it("should filter by inactive and press toggle status", async () => {
    const user = userEvent.setup();
    render (
        <App />
    )
    await screen.findByText("Ali", {}, { timeout: 3000 });
    const inactiveFilter = screen.getByRole("radio", {name: "Inactive"});
    await user.click(inactiveFilter);
    const customerName = screen.getByText("Ali");
    const customerCard = customerName.closest("div");
    const toggleStatus = within(customerCard!).getByRole("button", {name: "Toggle Status"});
    await user.click(toggleStatus);
    expect(screen.queryByText("Ali")).not.toBeInTheDocument();
    expect(screen.queryByText("Mohamad")).toBeInTheDocument();
});

afterEach(() => {
  vi.restoreAllMocks();
});

it("should search customer and delete it", async () => {
    const user = userEvent.setup();
    const confirmSpy = vi.spyOn(window, "confirm");
    confirmSpy.mockReturnValue(true);
    render (
        <App />
    )
    await screen.findByText("Ali", {}, { timeout: 3000 });
    const searchInput = screen.getByPlaceholderText("Search customers...");
    await user.type(searchInput, "Ali");
    const customerName = screen.getByText("Ali");
    const customerCard = customerName.closest("div");
    const deleteCustomer = within(customerCard!).getByRole("button", {name: "Delete Customer"});
    await user.click(deleteCustomer);
    expect(screen.queryByText("Ali")).not.toBeInTheDocument();
    expect(confirmSpy).toHaveBeenCalledTimes(1); 
    expect(confirmSpy).toHaveBeenCalledWith(
        "Are you sure you want to delete this customer?"
    );
    expect(screen.getByText("No customers found")).toBeInTheDocument();
});

it("should show loading while fetching customers", () => {
    render(<App />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
});

it("should show error message when API fails", async () => {
    vi.spyOn(customerService, "getCustomers").mockRejectedValue(
        new Error("API failed")
    );
    render (
        <App />
    );
    expect(await screen.findByText("Failed to load customers")).toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
})

it("should show loading while API is pending", () => {
    vi.spyOn(customerService, "getCustomers").mockImplementation(
        () => new Promise(() => {})
    )
    render (
        <App />
    )
    expect (screen.getByText("Loading...")).toBeInTheDocument();
})