import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';

interface Ticket {
  id: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  seats: string[];
  price: number;
  status: 'confirmed' | 'cancelled' | 'failed' | 'pending';
  bookingDate: string;
  qrCode: string;
}

const MyTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock tickets data
  const mockTickets: Ticket[] = [
    {
      id: 'TKT-001',
      eventTitle: 'Summer Music Festival 2024',
      eventDate: '2024-07-15',
      eventTime: '18:00',
      venue: 'Central Park, New York',
      seats: ['A12', 'A13'],
      price: 178,
      status: 'confirmed',
      bookingDate: '2024-06-01',
      qrCode: 'QR123456789'
    },
    {
      id: 'TKT-002',
      eventTitle: 'Tech Conference: AI & Future',
      eventDate: '2024-08-22',
      eventTime: '09:00',
      venue: 'Convention Center, San Francisco',
      seats: ['B5'],
      price: 199,
      status: 'pending',
      bookingDate: '2024-06-10',
      qrCode: 'QR987654321'
    },
    {
      id: 'TKT-003',
      eventTitle: 'Comedy Night Special',
      eventDate: '2024-05-20',
      eventTime: '21:00',
      venue: 'Laugh Factory, Hollywood',
      seats: ['C8', 'C9'],
      price: 70,
      status: 'cancelled',
      bookingDate: '2024-05-01',
      qrCode: 'QR456789123'
    },
    {
      id: 'TKT-004',
      eventTitle: 'Art Gallery Opening',
      eventDate: '2024-07-08',
      eventTime: '19:00',
      venue: 'Modern Art Museum, Los Angeles',
      seats: ['D15'],
      price: 25,
      status: 'failed',
      bookingDate: '2024-06-15',
      qrCode: 'QR789123456'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadTickets = async () => {
      setLoading(true);
      
      // Intentional bug: sometimes returns empty array even if user has tickets
      setTimeout(() => {
        if (Math.random() > 0.8) {
          console.log('API Bug: Returning empty tickets array');
          setTickets([]);
        } else {
          setTickets(mockTickets);
        }
        setLoading(false);
      }, 1500);
    };

    loadTickets();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowTicketModal(true);
  };

  const handleCancelTicket = (ticketId: string) => {
    // Intentional bug: cancel sometimes doesn't work
    if (Math.random() > 0.7) {
      console.log('Cancel bug: Operation failed');
      alert('Unable to cancel ticket. Please contact support.');
      return;
    }

    const updatedTickets = tickets.map(ticket =>
      ticket.id === ticketId ? { ...ticket, status: 'cancelled' as const } : ticket
    );
    setTickets(updatedTickets);
    alert('Ticket cancelled successfully');
  };

  const handleDownloadTicket = (ticket: Ticket) => {
    console.log('Downloading ticket:', ticket.id);
    // Bug: download sometimes shows undefined
    const message = Math.random() > 0.3 ? `Downloading ${ticket.eventTitle} ticket` : undefined;
    alert(message || 'undefined');
  };

  const handleResendEmail = (ticketId: string) => {
    console.log('Resending email for ticket:', ticketId);
    alert('Confirmation email sent!');
  };

  const handleRefund = (_ticketId: string) => {
    // Bug: refund process is broken
    console.log('Refund bug: Process not implemented');
    alert('Refund processing is temporarily unavailable');
  };

  const filteredTickets = filterStatus === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === filterStatus);

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Tickets</h1>
            <p className="text-gray-600">Manage your event tickets and bookings</p>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost">
              📧 Email All Tickets
            </Button>
            <Button variant="ghost">
              📱 Mobile Tickets
            </Button>
          </div>
        </div>

        {/* Filter and Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Tickets</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="failed">Failed</option>
              </select>
              
              <Button variant="ghost">
                📅 Sort by Date
              </Button>
              <Button variant="ghost">
                🎫 Sort by Event
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                📊 Export
              </Button>
              <Button variant="ghost" size="sm" broken={true}>
                🔄 Sync
              </Button>
              <Button variant="ghost" size="sm">
                ⚙️ Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-xl font-semibold mb-2">No tickets found</h3>
            <p className="text-gray-600 mb-6">
              {tickets.length === 0 
                ? "You haven't booked any tickets yet." 
                : "No tickets match your current filter."}
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => window.location.href = '/events'}>
                Browse Events
              </Button>
              {filterStatus !== 'all' && (
                <Button variant="ghost" onClick={() => setFilterStatus('all')}>
                  Clear Filter
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{ticket.eventTitle}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="mr-2">📅</span>
                            <span>{ticket.eventDate} at {ticket.eventTime}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2">📍</span>
                            <span>{ticket.venue}</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="mr-2">🎫</span>
                            <span>Seats: {ticket.seats.join(', ')}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2">💰</span>
                            <span>${ticket.price}</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="mr-2">🆔</span>
                            <span>{ticket.id}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2">📋</span>
                            <span>Booked: {ticket.bookingDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button 
                      onClick={() => handleViewTicket(ticket)}
                      variant="primary"
                      size="sm"
                    >
                      View Ticket
                    </Button>
                    
                    <Button 
                      onClick={() => handleDownloadTicket(ticket)}
                      variant="ghost"
                      size="sm"
                    >
                      📥 Download
                    </Button>
                    
                    <Button 
                      onClick={() => handleResendEmail(ticket.id)}
                      variant="ghost"
                      size="sm"
                    >
                      📧 Resend Email
                    </Button>
                    
                    {ticket.status === 'confirmed' && (
                      <Button 
                        onClick={() => handleCancelTicket(ticket.id)}
                        variant="danger"
                        size="sm"
                        broken={true}
                      >
                        Cancel
                      </Button>
                    )}
                    
                    {ticket.status === 'failed' && (
                      <Button 
                        onClick={() => handleRefund(ticket.id)}
                        variant="warning"
                        size="sm"
                        broken={true}
                      >
                        Request Refund
                      </Button>
                    )}
                    
                    <Button 
                      variant="ghost"
                      size="sm"
                    >
                      📤 Share
                    </Button>
                    
                    <Button 
                      variant="ghost"
                      size="sm"
                    >
                      📞 Support
                    </Button>
                    
                    <Button 
                      variant="ghost"
                      size="sm"
                      broken={true}
                    >
                      🔄 Transfer
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="ghost" className="h-16 flex-col">
              <span className="text-2xl mb-1">📱</span>
              <span className="text-sm">Mobile App</span>
            </Button>
            <Button variant="ghost" className="h-16 flex-col">
              <span className="text-2xl mb-1">🎁</span>
              <span className="text-sm">Gift Tickets</span>
            </Button>
            <Button variant="ghost" className="h-16 flex-col">
              <span className="text-2xl mb-1">📞</span>
              <span className="text-sm">Contact Support</span>
            </Button>
            <Button variant="ghost" className="h-16 flex-col" broken={true}>
              <span className="text-2xl mb-1">💳</span>
              <span className="text-sm">Payment Methods</span>
            </Button>
          </div>
        </div>

        {/* Ticket Details Modal */}
        <Modal
          isOpen={showTicketModal}
          onClose={() => setShowTicketModal(false)}
          title="Ticket Details"
          size="lg"
        >
          {selectedTicket && (
            <div className="space-y-6">
              {/* QR Code Section */}
              <div className="text-center">
                <div className="bg-gray-100 p-8 rounded-lg inline-block">
                  <div className="w-32 h-32 bg-white border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-500">QR Code</span>
                  </div>
                  <p className="text-sm text-gray-600">Scan at venue entrance</p>
                </div>
              </div>

              {/* Ticket Information */}
              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4">Event Information</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Event:</strong> {selectedTicket.eventTitle}</p>
                    <p><strong>Date:</strong> {selectedTicket.eventDate}</p>
                    <p><strong>Time:</strong> {selectedTicket.eventTime}</p>
                    <p><strong>Venue:</strong> {selectedTicket.venue}</p>
                  </div>
                  <div>
                    <p><strong>Ticket ID:</strong> {selectedTicket.id}</p>
                    <p><strong>Seats:</strong> {selectedTicket.seats.join(', ')}</p>
                    <p><strong>Price:</strong> ${selectedTicket.price}</p>
                    <p><strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusColor(selectedTicket.status)}`}>
                        {selectedTicket.status.toUpperCase()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t">
                <Button onClick={() => handleDownloadTicket(selectedTicket)} className="flex-1">
                  📥 Download PDF
                </Button>
                <Button variant="ghost" className="flex-1">
                  📧 Email Ticket
                </Button>
                <Button variant="ghost" onClick={() => setShowTicketModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MyTickets;