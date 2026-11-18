export type Customer = {
  name: string;
  family: string;
  email: string;
  company: string;
  phone?: string;
  isActive: boolean;
};

export type StatusFilter = "All" | "Active" | "Inactive";

export type SortOrder = "Asc" | "Desc";