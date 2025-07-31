import { Link } from 'react-router-dom';
import Button from './Button';

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

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const handleQuickBook = () => {
    console.log('Quick booking for event:', event.id);
    // Intentional bug: sometimes shows undefined in toast
    const message = Math.random() > 0.3 ? `Quick booking for ${event.title}` : undefined;
    alert(message || 'undefined');
  };

  const handleAddToWishlist = () => {
    // Bug: logs wrong event ID sometimes
    const loggedId = Math.random() > 0.8 ? 'undefined' : event.id;
    console.log('Added to wishlist:', loggedId);
    alert('Added to wishlist!');
  };

  const handleShare = () => {
    // Bug: share functionality doesn't work properly
    if (Math.random() > 0.5) {
      console.log('Share failed - feature broken');
      alert('Share feature temporarily unavailable');
      return;
    }
    console.log('Sharing event:', event.title);
    alert('Event shared!');
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
      {/* Event Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback for broken images
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5FdmVudCBJbWFnZTwvdGV4dD48L3N2Zz4=';
          }}
        />
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {event.category}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-2 right-2">
          <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            ${event.price}
          </span>
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={handleAddToWishlist}
          className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition wrong-cursor"
        >
          ❤️
        </button>
      </div>

      {/* Event Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
          {event.title}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <span className="mr-2">📅</span>
            <span>{event.date}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">⏰</span>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            <span className="misaligned">{event.location}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🎫</span>
            <span className={event.available < 10 ? 'text-red-600 font-medium' : ''}>
              {event.available} tickets left
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link to={`/book/${event.id}`} className="flex-1">
            <Button variant="primary" className="w-full">
              Book Now
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            onClick={handleQuickBook}
            broken={true}
            className="px-3"
          >
            ⚡
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={handleShare}
            className="px-3"
          >
            📤
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Event ID: {event.id}</span>
            <span className="flickering">🔥 Hot Event</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;