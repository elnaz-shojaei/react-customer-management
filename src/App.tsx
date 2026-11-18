import { useEffect, useState } from 'react'
import './App.css'
import CustomerCard from './CustomerCard'
import type {Customer, StatusFilter, SortOrder} from './type/customer';
import { matchesCustomerSearch, matchesCustomerStatus, sortCustomersByName } from './utils/customer.utils';
import { getCustomers } from './services/customer.service';

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<StatusFilter>("All");
  const [sortedName, setSortedName] = useState<SortOrder>("Asc");

  useEffect(() => {
    async function fetchCustomer() {
      try{
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        setError("Failed to load customers");
      }finally {
        setIsLoading(false);
      }
    }
    fetchCustomer();
  }, []);

  function toggleCustomerStatus (email: string) {
    setCustomers((prevCustomers) => 
      prevCustomers.map((customer) => 
        customer.email === email 
        ?  { ...customer, isActive: !customer.isActive }
          : 
        customer
      ))
  }

  function deleteCustomer (email: string) {
    const confirmed = window.confirm("Are you sure you want to delete this customer?");

    if (!confirmed) return;

    setCustomers((prevCustomers) => 
      prevCustomers.filter(
        (customer) => customer.email !== email
      ));
  }

  const activeCount = customers.filter (
    (customer) => customer.isActive
  ).length;

  const filteredCustomers = customers.filter((customer) => {
    const matchedSearch = matchesCustomerSearch(customer, searchTerm)
    const matchesStatus = matchesCustomerStatus(customer, filterStatus)

    return matchedSearch && matchesStatus;
  });

  const sortedCustomers = sortCustomersByName (
    filteredCustomers,
    sortedName
  )
  
  if (isLoading) {
      return <p>Loading...</p>;
  }

  if (error) {
      return <p>{error}</p>;
  }
  return (
    
    <>
      <section id="next-steps">
        <div>
           <h1 className="text-2xl font-bold">
            Customers
          </h1>

          <p className='pb-2'>
            Active customers: {activeCount}
          </p>
          <label>
            Search:
            <input type='text' placeholder='Search customers...' name='search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='border rounded m-2 p-2 text-sm'/>
          </label>
          <p className='pb-2'>
            Active/Inactive:
            <label className='mx-2'>
              <input type="radio" name="status" value="All" checked={filterStatus === "All"} onChange={(e) => setFilterStatus(e.target.value as StatusFilter)} className='mr-1' />
              All
            </label>
            <label className='mx-2'>
              <input type="radio" name="status" value="Active" checked={filterStatus === "Active"} onChange={(e) => setFilterStatus(e.target.value as StatusFilter)} className='mr-1' />
              Active
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={filterStatus === "Inactive"} onChange={(e) => setFilterStatus(e.target.value as StatusFilter)}
                className='mr-1'
              />
              Inactive
            </label>
          </p>
          <button onClick={() => setSortedName("Asc")} className='mr-4 cursor-pointer border rounded-xl py-1 px-2 bg-indigo-600 mb-2 text-white'>
            A → Z
          </button>

          <button onClick={() => setSortedName("Desc")} className='mr-4 cursor-pointer border rounded-xl py-1 px-2 bg-indigo-600 mb-2 text-white'>
            Z → A
          </button>
          <div className="grid gap-4 h-full">
            {filteredCustomers.length > 0 ? (
                sortedCustomers.map((customer) => (
                  <CustomerCard key={customer.email} customer={customer} onToggleStatus={toggleCustomerStatus} onDeleteCustomers={deleteCustomer} />
                ))
              )
              :
              (
                <p className='flex justify-center font-bold items-center'>No customers found</p>
              )
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default App
