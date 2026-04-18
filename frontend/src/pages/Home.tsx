import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "../services/contactService";
import { type Contact } from "../types/contact";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchContacts = async () => {
    const res = await getContacts();
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteContact(id);
    fetchContacts();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Manager</h1>

      {contacts.map((c) => (
        <div
          key={c._id}
          className="p-4 border rounded-lg mb-2 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{c.name}</p>
            <p className="text-sm text-gray-500">{c.email}</p>
          </div>

          <button
            onClick={() => handleDelete(c._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}