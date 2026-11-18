
import type {Customer, StatusFilter, SortOrder} from '../type/customer';

// export function getCustomerSearchText(customer: Customer) : string {
//   return `${customer.name} ${customer.family} ${customer.email} ${customer.phone ?? ""} ${customer.company}`.toLowerCase();
// }

export function getCustomerSearchText(customer: Customer): string {
  return [
    customer.name,
    customer.family,
    customer.email,
    customer.phone,
    customer.company,
  ]
    .filter((value) => value !== undefined && value !== "")
    .join(" ")
    .toLowerCase();
}

export function matchesCustomerSearch(
  customer: Customer,
  searchTerm: string
): boolean {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const searchWords = normalizedSearch
    ? normalizedSearch.split(/\s+/)
    : [];

  const customerInfo = getCustomerSearchText(customer);

  return searchWords.every((word) =>
    customerInfo.includes(word)
  );
}

export function matchesCustomerStatus(
    customer: Customer,
    filterStatus: StatusFilter
) : boolean {
    return (
        filterStatus === "All" ||
        (filterStatus === "Active" && customer.isActive) ||
        (filterStatus === "Inactive" && !customer.isActive)
    );
}

export function sortCustomersByName (
  customers: Customer[],
  sortOrder: SortOrder
): Customer[] {
  return [...customers].sort((a,b) => {
    return sortOrder === "Asc" ?
         a.name.localeCompare(b.name) :
         b.name.localeCompare(a.name)
  });
}
