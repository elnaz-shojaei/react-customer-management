
import type { Customer } from "../type/customer";

export function getCustomers(): Promise<Customer[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    name: "Elnaz",
                    family: "Shojaei",
                    email: "elnaz@gmail.com",
                    company: "Austro",
                    phone: "09123456789",
                    isActive: true,
                },
                {
                    name: "Ali",
                    family: "Ahmadi",
                    email: "bahman@example.com",
                    company: "Shakhsi",
                    isActive: false,
                },
                {
                    name: "Mohamad",
                    family: "Rezaei",
                    email: "mohammadreza@example.com",
                    company: "Company",
                    isActive: false,
                },
            ]);
        }, 1000);
    });
}
