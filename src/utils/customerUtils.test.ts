import { describe, it, expect } from "vitest";
import { getCustomerSearchText, matchesCustomerSearch, matchesCustomerStatus, sortCustomersByName } from "./customer.utils"
import type { Customer } from "../type/customer";

describe("getCustomerSearchText", () => {
    it("should return customer information in lowercase", () => {
    const customer: Customer = {
      name: "Elnaz",
      family: "Shojaei",
      email: "Elnaz@gmail.com",
      company: "AustroByte",
      phone: "09151234567",
      isActive: true,
    };

    const result = getCustomerSearchText(customer);

    expect(result).toBe(
        "elnaz shojaei elnaz@gmail.com 09151234567 austrobyte"
    );

    expect(result).toContain("09151234567");

    expect(result).toContain("elnaz");
    expect(result).toContain("elnaz@gmail.com");
    expect(result).toContain("gmail");
    });

    it("should convert all customer information to lowercase", () => {
    const customer: Customer = {
        name: "SARA",
        family: "AHMADI",
        email: "SARA@GMAIL.COM",
        company: "GOOGLE",
        isActive: true,
    };

    const result = getCustomerSearchText(customer);

    expect(result).toBe("sara ahmadi sara@gmail.com google");
    });

    it("should not contain extra spaces when phone is missing", () => {
    const customer: Customer = {
        name: "Sara",
        family: "Ahmadi",
        email: "sara@gmail.com",
        company: "Google",
        isActive: true,
    };

    const result = getCustomerSearchText(customer);

    expect(result).toBe("sara ahmadi sara@gmail.com google");
    expect(result).not.toContain("  ");
    });

    it("should match customer when all search words exist", () => {
    const customer: Customer = {
        name: "Sara",
        family: "Ahmadi",
        email: "sara@gmail.com",
        company: "Google",
        isActive: true,
    };

    const result = matchesCustomerSearch(customer, "sara google");

    expect(result).toBe(true);
    });

    it("should return false when a search word does not exist", () => {
    const customer: Customer = {
        name: "Sara",
        family: "Ahmadi",
        email: "sara@gmail.com",
        company: "Google",
        isActive: true,
    };

    const result = matchesCustomerSearch(customer, "sara microsoft");

    expect(result).toBe(false);
    });

    it("should return true when search term is empty", () => {
    const customer: Customer = {
        name: "Sara",
        family: "Ahmadi",
        email: "sara@gmail.com",
        company: "Google",
        isActive: true,
    };

    const result = matchesCustomerSearch(customer, "");

    expect(result).toBe(true);
    });

    it("should return true when search term is empty", () => {
    const customer: Customer = {
        name: "Sara",
        family: "Ahmadi",
        email: "sara@gmail.com",
        company: "Google",
        isActive: true,
    };

    const result = matchesCustomerSearch(customer, "   ");

    expect(result).toBe(true);
    });

    it("should ignore uppercase and lowercase differences", () => {
    const customer: Customer = {
        name: "Sara",
        family: "Ahmadi",
        email: "sara@gmail.com",
        company: "Google",
        isActive: true,
    };

    const result = matchesCustomerSearch(customer, "SARA GOOGLE");

    expect(result).toBe(true);
    });

    it("should match regardless of search word order", () => {
    const customer: Customer = {
        name: "Sara",
        family: "Ahmadi",
        email: "sara@gmail.com",
        company: "Google",
        isActive: true,
    };

    const result = matchesCustomerSearch(customer, "google sara");

    expect(result).toBe(true);
    });

    it("should ignore extra spaces in search term", () => {
    const customer: Customer = {
        name: "Sara",
        family: "Ahmadi",
        email: "sara@gmail.com",
        company: "Google",
        isActive: true,
    };

    const result = matchesCustomerSearch(customer, "   google     sara   ");

    expect(result).toBe(true);
    });

    it("should return true when search term contains only spaces", () => {
    const customer: Customer = {
        name: "Sara",
        family: "Ahmadi",
        email: "sara@gmail.com",
        company: "Google",
        isActive: true,
    };

    const result = matchesCustomerSearch(customer, " ");

    expect(result).toBe(true);
    });

    it("should match an active customer when status filter is All", () => {
        const customer: Customer = {
            name: "Elnaz",
            family: "Shojaei",
            email: "elnaz.shojaei@gmail.com",
            company: "Austro",
            isActive: true,
        };

        const result = matchesCustomerStatus(customer, "All");

        expect(result).toBe(true)
    })

    it("should match an inactive customer when status filter is All", () => {
        const customer: Customer = {
            name: "Elnaz",
            family: "Shojaei",
            email: "elnaz.shojaei@gmail.com",
            company: "Austro",
            isActive: false,
        };

        const result = matchesCustomerStatus(customer, "All");

        expect(result).toBe(true)
    })

    it("should match an active customer when status filter is Active", () => {
        const customer: Customer = {
            name: "Elnaz",
            family: "Shojaei",
            email: "elnaz.shojaei@gmail.com",
            company: "Austro",
            isActive: true,
        };

        const result = matchesCustomerStatus(customer, "Active");

        expect(result).toBe(true)
    })

    it("should match an inactive customer when status filter is Inactive", () => {
        const customer: Customer = {
            name: "Elnaz",
            family: "Shojaei",
            email: "elnaz.shojaei@gmail.com",
            company: "Austro",
            isActive: false,
        };

        const result = matchesCustomerStatus(customer, "Inactive");

        expect(result).toBe(true)
    })

    it("should not match an active customer when status filter is Inactive", () => {
        const customer: Customer = {
            name: "Elnaz",
            family: "Shojaei",
            email: "elnaz.shojaei@gmail.com",
            company: "Austro",
            isActive: true,
        };

        const result = matchesCustomerStatus(customer, "Inactive");

        expect(result).toBe(false)
    })

    it("should sort array asc", () => {
        const customers: Customer[] = 
        [
            {
            name: "Sara",
            family: "Ahmadi",
            email: "sara@gmail.com",
            company: "Austro",
            isActive: true,
            },
            {
            name: "Elnaz",
            family: "Shojaei",
            email: "elnaz.shojaei@gmail.com",
            company: "Austro",
            isActive: true,
            },
            {
            name: "Ali",
            family: "Ahmadian",
            email: "ali@gmail.com",
            company: "shakhsi",
            isActive: true,
            }
        ];
        
        const result = sortCustomersByName(customers, "Asc");

        expect(result.map((customer) => customer.name)).toEqual(["Ali", "Elnaz", "Sara"]);
    })

    it("should sort array desc", () => {
        const customers: Customer[] = 
        [
            {
            name: "Sara",
            family: "Ahmadi",
            email: "sara@gmail.com",
            company: "Austro",
            isActive: true,
            },
            {
            name: "Elnaz",
            family: "Shojaei",
            email: "elnaz.shojaei@gmail.com",
            company: "Austro",
            isActive: true,
            },
            {
            name: "Ali",
            family: "Ahmadian",
            email: "ali@gmail.com",
            company: "Austro",
            isActive: true,
            }
        ];
        
        const result = sortCustomersByName(customers, "Desc");

        expect(result.map((customer) => customer.name)).toEqual(["Sara", "Elnaz", "Ali"]);
    })

    it("test make copy of the original array", () => {
        const customers: Customer[] = 
        [
            {
            name: "Sara",
            family: "Ahmadi",
            email: "sara@gmail.com",
            company: "Austro",
            isActive: true,
            },
            {
            name: "Elnaz",
            family: "Shojaei",
            email: "elnaz.shojaei@gmail.com",
            company: "Austro",
            isActive: true,
            },
            {
            name: "Ali",
            family: "Ahmadian",
            email: "Ali@gmail.com",
            company: "Austro",
            isActive: true,
            }
        ];

        const originalcustomers = [...customers]
        
        const result = sortCustomersByName(customers, "Asc");

        expect(customers).toEqual(originalcustomers);
        expect(result).not.toBe(customers);
    })
    
});