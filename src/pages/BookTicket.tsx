import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Modal from '../components/Modal';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  category: string;
  available: number;
}

const BookTicket = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [, setBookingStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  });

  // Mock event data
  const mockEvent: Event = {
    id: parseInt(eventId || '1'),
    title: "Summer Music Festival 2024",
    date: "2024-07-15",
    time: "18:00",
    location: "Central Park, New York",
    price: 89,
    image: "https://picsum.photos/800/400?random=1",
    category: "Music",
    available: 150
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvent(mockEvent);
      setLoading(false);
    }, 1000);
  }, [eventId]);

  const generateSeatGrid = () => {
    const seats = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    
    // Intentional bug: sometimes seats don't render
    if (Math.random() > 0.8) {
      console.log('Seat rendering bug: Grid failed to load');
      return <div className="text-center py-8 text-red-600">Seat map temporarily unavailable</div>;
    }

    for (let row of rows) {
      const rowSeats = [];
      for (let num = 1; num <= 12; num++) {
        const seatId = `${row}${num}`;
        const isOccupied = Math.random() > 0.7;
        const isSelected = selectedSeats.includes(seatId);
        
        rowSeats.push(
          <button
            key={seatId}
            onClick={() => handleSeatSelect(seatId)}
            disabled={isOccupied}
            className={`seat ${isOccupied ? 'occupied' : isSelected ? 'selected' : 'available'}`}
            title={`Seat ${seatId} - ${isOccupied ? 'Occupied' : isSelected ? 'Selected' : 'Available'}`}
          >
            {seatId}
          </button>
        );
      }
      seats.push(
        <div key={row} className="flex justify-center mb-2">
          <span className="w-8 text-center font-medium mr-4">{row}</span>
          {rowSeats}
        </div>
      );
    }
    return seats;
  };

  const handleSeatSelect = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else if (selectedSeats.length < 6) { // Max 6 seats
      setSelectedSeats([...selectedSeats, seatId]);
    } else {
      alert('Maximum 6 seats can be selected');
    }
  };

  const handleTabChange = (tab: string) => {
    // Intentional bug: "Seats" tab sometimes doesn't work
    if (tab === 'seats' && Math.random() > 0.7) {
      console.log('Tab bug: Seats tab not responding');
      return;
    }
    setActiveTab(tab);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'cardNumber', 'expiryDate', 'cvv'];
    
    // Intentional bug: skip validation for phone number
    for (let field of required) {
      if (!formData[field as keyof typeof formData]) {
        alert(`Please fill in ${field}`);
        return false;
      }
    }
    
    // Bug: email validation sometimes fails
    if (Math.random() > 0.8) {
      console.log('Validation bug: Email check skipped');
    } else if (!formData.email.includes('@')) {
      alert('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleBooking = () => {
    // Intentional bug: booking sometimes doesn't work
    if (Math.random() > 0.8) {
      console.log('Booking bug: Submit button not responding');
      alert('Booking system temporarily unavailable. Please try again.');
      return;
    }

    if (!validateForm()) return;
    
    if (selectedSeats.length === 0 && activeTab === 'seats') {
      alert('Please select at least one seat');
      return;
    }

    setShowConfirmModal(true);
  };

  const confirmBooking = () => {
    console.log('Booking confirmed:', {
      event: event?.title,
      seats: selectedSeats,
      quantity: ticketQuantity,
      total: (event?.price || 0) * (selectedSeats.length || ticketQuantity)
    });
    
    setShowConfirmModal(false);
    alert('Booking confirmed! Redirecting to My Tickets...');
    
    // Bug: sometimes doesn't redirect
    if (Math.random() > 0.3) {
      setTimeout(() => navigate('/my-tickets'), 1000);
    } else {
      console.log('Navigation bug: Redirect failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p>Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
          <Button onClick={() => navigate('/events')}>
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  const totalPrice = (selectedSeats.length || ticketQuantity) * event.price;

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Event Header */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <span className="mr-2">📅</span>
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">💰</span>
                      <span className="text-2xl font-bold text-green-600">${event.price}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    {event.category}
                  </div>
                  <div className="text-sm text-gray-600">
                    {event.available} tickets left
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button onClick={() => navigate('/events')} variant="ghost">
                  ← Back to Events
                </Button>
                <Button variant="ghost">
                  📤 Share Event
                </Button>
                <Button variant="ghost">
                  ❤️ Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex">
              {['overview', 'seats', 'payment'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                >
                  {tab === 'overview' && '📋 Overview'}
                  {tab === 'seats' && '🎫 Select Seats'}
                  {tab === 'payment' && '💳 Payment'}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Event Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-gray-600">
                        Join us for an unforgettable experience at {event.title}. 
                        This amazing event features world-class entertainment, 
                        great food, and an atmosphere you won't forget!
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">What's Included</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Event admission</li>
                        <li>• Complimentary programs</li>
                        <li>• Access to facilities</li>
                        <li>• Customer support</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Ticket Quantity</h4>
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                      variant="ghost"
                      size="sm"
                    >
                      -
                    </Button>
                    <span className="text-xl font-semibold w-12 text-center">{ticketQuantity}</span>
                    <Button 
                      onClick={() => setTicketQuantity(Math.min(6, ticketQuantity + 1))}
                      variant="ghost"
                      size="sm"
                    >
                      +
                    </Button>
                    <span className="ml-4 text-gray-600">Max 6 tickets per booking</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total: ${totalPrice}</span>
                    <Button onClick={() => setActiveTab('seats')} size="lg">
                      Continue to Seat Selection
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Seats Tab */}
            {activeTab === 'seats' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Select Your Seats</h3>
                  <p className="text-gray-600 mb-6">Click on available seats to select them</p>
                  
                  {/* Seat Legend */}
                  <div className="flex justify-center gap-6 mb-8">
                    <div className="flex items-center">
                      <div className="seat available mr-2"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center">
                      <div className="seat selected mr-2"></div>
                      <span className="text-sm">Selected</span>
                    </div>
                    <div className="flex items-center">
                      <div className="seat occupied mr-2"></div>
                      <span className="text-sm">Occupied</span>
                    </div>
                  </div>
                </div>

                {/* Stage */}
                <div className="text-center mb-8">
                  <div className="bg-gray-800 text-white py-2 px-8 rounded-lg inline-block">
                    🎭 STAGE
                  </div>
                </div>

                {/* Seat Grid */}
                <div className="overflow-x-auto">
                  <div className="min-w-max">
                    {generateSeatGrid()}
                  </div>
                </div>

                {/* Selected Seats Summary */}
                {selectedSeats.length > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Selected Seats ({selectedSeats.length})</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedSeats.map(seat => (
                        <span key={seat} className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                          {seat}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">Total: ${totalPrice}</span>
                      <Button onClick={() => setActiveTab('payment')} size="lg">
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Payment Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div>
                    <h4 className="font-medium mb-4">Personal Information</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={(e) => handleFormChange('firstName', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={(e) => handleFormChange('lastName', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleFormChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number (Optional)"
                        value={formData.phone}
                        onChange={(e) => handleFormChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h4 className="font-medium mb-4">Payment Details</h4>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={(e) => handleFormChange('cardNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => handleFormChange('expiryDate', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={(e) => handleFormChange('cvv', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Billing Address"
                        value={formData.billingAddress}
                        onChange={(e) => handleFormChange('billingAddress', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-medium mb-4">Order Summary</h4>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Event: {event.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date: {event.date} at {event.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tickets: {selectedSeats.length || ticketQuantity}</span>
                      <span>${event.price} each</span>
                    </div>
                    {selectedSeats.length > 0 && (
                      <div className="flex justify-between">
                        <span>Seats: {selectedSeats.join(', ')}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button onClick={() => setActiveTab('seats')} variant="ghost" className="flex-1">
                      Back to Seats
                    </Button>
                    <Button onClick={handleBooking} size="lg" className="flex-1" broken={true}>
                      Complete Booking
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation Modal */}
        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title="Confirm Your Booking"
          size="md"
        >
          <div className="space-y-4">
            <p>Please confirm your booking details:</p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div><strong>Event:</strong> {event.title}</div>
              <div><strong>Date:</strong> {event.date} at {event.time}</div>
              <div><strong>Tickets:</strong> {selectedSeats.length || ticketQuantity}</div>
              {selectedSeats.length > 0 && (
                <div><strong>Seats:</strong> {selectedSeats.join(', ')}</div>
              )}
              <div><strong>Total:</strong> ${totalPrice}</div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button onClick={() => setShowConfirmModal(false)} variant="ghost" className="flex-1">
                Cancel
              </Button>
              <Button onClick={confirmBooking} className="flex-1">
                Confirm Booking
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BookTicket;