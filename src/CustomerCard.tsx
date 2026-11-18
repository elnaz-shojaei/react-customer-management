import {useState} from "react";
import type {Customer} from "./type/customer";

type CustomerCardProps = {
    customer: Customer;
    onToggleStatus: (email: string) => void ;
    onDeleteCustomers: (email: string) => void;
}

export default function CustomerCard({customer, onToggleStatus, onDeleteCustomers} : CustomerCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border border-indigo-600 p-4 rounded-md">
            <h2 className="text-xl font-bold">{customer.name}</h2>
            <p>{customer.email}</p>
            <p>{customer.company}</p>
            {customer.phone && <p>{customer.phone}</p>}
            <p>{customer.isActive ? "Active" : "Inactive"}</p>
            <button
                onClick={() => onToggleStatus(customer.email)}
                className="border rounded px-3 py-1 mt-2"
            >
                Toggle Status
            </button>
            <button onClick={() => setIsExpanded(prev => !prev)} className="border rounded border-indigo-600 px-3 py-1 ml-2">
                {isExpanded ? "Hide Details" : "Show Details"}
            </button>
            
            <button
                onClick={() => onDeleteCustomers(customer.email)}
                className="border rounded px-3 py-1 mt-2 ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={customer.isActive}
            >
                Delete Customer
            </button>
            

            {isExpanded && <p>{customer.family}</p>}
            
            
        </div>
    )

}