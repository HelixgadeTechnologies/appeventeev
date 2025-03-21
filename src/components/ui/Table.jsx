import React, { useContext, useState } from "react";
import { TicketContext } from "../../contexts/TicketContext";
import { toast } from "react-hot-toast";

const Table = ({ type }) => {
    const { ticketData, getTickets } = useContext(TicketContext);
    const [selectedTickets, setSelectedTickets] = useState(new Set());
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleCheckboxChange = (id) => {
        setSelectedTickets((prev) => {
            const newSelection = new Set(prev);
            newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);
            return newSelection;
        });
    };

    const formatDate = (isoString) => {
        if (!isoString) return "N/A";
        const date = new Date(isoString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);

        const day = date.getDate();
        const suffix =
            day % 10 === 1 && day !== 11 ? "st" :
            day % 10 === 2 && day !== 12 ? "nd" :
            day % 10 === 3 && day !== 13 ? "rd" : "th";

        return `${day}${suffix} ${formattedDate.split(' ')[1]} ${formattedDate.split(' ')[2]}`;
    };

    const handleDelete = async () => {
        if (selectedTickets.size === 0) return;

        setLoading(true);
        try {
            const response = await fetch("/api/delete-tickets", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ticketIds: Array.from(selectedTickets) }),
            });

            if (!response.ok) throw new Error("Failed to delete tickets");

            toast.success("Tickets deleted successfully");
            getTickets();
            setSelectedTickets(new Set());
            setShowModal(false);
        } catch (error) {
            toast.error("Error deleting tickets");
            console.error("Error deleting tickets:", error);
        }
        setLoading(false);
    };

    return (
        <div className="overflow-x-auto">
            <button 
                onClick={() => setShowModal(true)} 
                disabled={selectedTickets.size === 0 || loading} 
                className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Deleting..." : "Delete Selected"}
            </button>

            <table className="min-w-full border border-gray-200 rounded-lg mt-2">
                <thead>
                    <tr className="text-left" style={{ backgroundColor: '#F9FAFB' }}>
                        <th className="px-4 py-2"><input type="checkbox" /></th>
                        <th className="px-4 py-2 font-medium">Name</th>
                        <th className="px-4 py-2 font-medium">Ticket Type</th>
                        <th className="px-4 py-2 font-medium">Ticket ID</th>
                        <th className="px-4 py-2 font-medium">Date Registered</th>
                        <th className="px-4 py-2 font-medium">Amount</th>
                    </tr>
                </thead>
                <tbody className="">
                    {ticketData.filter(ticket => ticket.type === type).map(ticket => (
                        <tr key={ticket._id} className="border-b border-gray-200">
                            <td className="px-4 py-3">
                                <input 
                                    type="checkbox" 
                                    checked={selectedTickets.has(ticket._id)}
                                    onChange={() => handleCheckboxChange(ticket._id)}
                                />
                            </td>
                            <td className="px-3 py-2 text-sm ">{ticket.name}</td>
                            <td className="px-4 py-3 text-sm">{ticket.type}</td>
                            <td className="px-4 py-3 text-sm">{ticket._id.slice(0, 7)}</td>
                            <td className="text-sm  rounded-md ">{formatDate(ticket.updatedAt)}</td>
                            <td className="px-4 py-3 text-sm">{ticket.price ? `$${ticket.price}` : ticket.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-2">Confirm Deletion</h2>
                        <p>Are you sure you want to delete {selectedTickets.size} selected tickets?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button 
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDelete} 
                                disabled={loading} 
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
