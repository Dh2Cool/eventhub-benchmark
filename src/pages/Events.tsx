import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import Button from '../components/Button';

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

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');

  // Extended mock events data
  const mockEvents: Event[] = [
    {
      id: 1,
      title: "Summer Music Festival 2024",
      date: "2024-07-15",
      time: "18:00",
      location: "Central Park, New York",
      price: 89,
      image: "https://picsum.photos/300/200?random=1",
      category: "Music",
      available: 150
    },
    {
      id: 2,
      title: "Tech Conference: AI & Future",
      date: "2024-08-22",
      time: "09:00",
      location: "Convention Center, San Francisco",
      price: 199,
      image: "https://picsum.photos/300/200?random=2",
      category: "Technology",
      available: 5
    },
    {
      id: 3,
      title: "Food & Wine Expo",
      date: "2024-06-30",
      time: "12:00",
      location: "Downtown Plaza, Chicago",
      price: 45,
      image: "https://picsum.photos/300/200?random=3",
      category: "Food",
      available: 75
    },
    {
      id: 4,
      title: "Art Gallery Opening",
      date: "2024-07-08",
      time: "19:00",
      location: "Modern Art Museum, Los Angeles",
      price: 25,
      image: "https://picsum.photos/300/200?random=4",
      category: "Art",
      available: 200
    },
    {
      id: 5,
      title: "Sports Championship Finals",
      date: "2024-09-15",
      time: "20:00",
      location: "MetLife Stadium, New Jersey",
      price: 250,
      image: "https://picsum.photos/300/200?random=5",
      category: "Sports",
      available: 0
    },
    {
      id: 6,
      title: "Comedy Night Special",
      date: "2024-07-20",
      time: "21:00",
      location: "Laugh Factory, Hollywood",
      price: 35,
      image: "https://picsum.photos/300/200?random=6",
      category: "Comedy",
      available: 30
    },
    {
      id: 7,
      title: "Classical Orchestra Performance",
      date: "2024-07-25",
      time: "19:30",
      location: "Symphony Hall, Boston",
      price: 120,
      image: "https://picsum.photos/300/200?random=7",
      category: "Music",
      available: 80
    },
    {
      id: 8,
      title: "Startup Pitch Competition",
      date: "2024-08-10",
      time: "14:00",
      location: "Innovation Hub, Austin",
      price: 50,
      image: "https://picsum.photos/300/200?random=8",
      category: "Technology",
      available: 100
    },
    {
      id: 9,
      title: "International Film Festival",
      date: "2024-09-05",
      time: "18:00",
      location: "Cinema Complex, Seattle",
      price: 75,
      image: "https://picsum.photos/300/200?random=9",
      category: "Entertainment",
      available: 45
    },
    {
      id: 10,
      title: "Fitness & Wellness Expo",
      date: "2024-07-12",
      time: "10:00",
      location: "Health Center, Miami",
      price: 30,
      image: "https://picsum.photos/300/200?random=10",
      category: "Health",
      available: 120
    }
  ];

  const categories = ['all', 'Music', 'Technology', 'Food', 'Art', 'Sports', 'Comedy', 'Entertainment', 'Health'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: '$200+' }
  ];

  useEffect(() => {
    // Simulate API call
    const loadEvents = async () => {
      setLoading(true);
      
      // Intentional bug: API sometimes fails
      if (Math.random() > 0.9) {
        console.log('API Error: Failed to load events');
        setTimeout(() => {
          setLoading(false);
          alert('Failed to load events. Please try again.');
        }, 2000);
        return;
      }

      setTimeout(() => {
        setEvents(mockEvents);
        setLoading(false);
      }, 1000);
    };

    loadEvents();
  }, []);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Intentional bug: search sometimes doesn't work
    if (Math.random() > 0.7) {
      console.log('Search bug: No results returned');
      alert('Search temporarily unavailable');
      return;
    }
    alert(`Searching for: ${searchTerm}`);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange('all');
    setDateFilter('all');
    setSortBy('date');
  };

  const handleExportResults = () => {
    console.log('Exporting filtered results...');
    alert('Export feature coming soon!');
  };

  const handleBulkAction = () => {
    // Bug: bulk actions don't work properly
    console.log('Bulk action failed - feature broken');
    alert('Bulk actions temporarily disabled');
  };

  // Filter events (with intentional bugs)
  const filteredEvents = events.filter(event => {
    // Search filter (sometimes doesn't work)
    if (searchTerm && Math.random() > 0.8) {
      return false; // Bug: search randomly fails
    }
    
    if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !event.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && event.category !== selectedCategory) {
      return false;
    }

    // Price filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      if (priceRange === '200+' && event.price < 200) return false;
      if (priceRange !== '200+') {
        const minPrice = parseInt(min);
        const maxPrice = parseInt(max);
        if (event.price < minPrice || event.price > maxPrice) return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">All Events</h1>
          <p className="text-gray-600">Discover amazing events happening near you</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          {/* Search Bar */}
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search events, venues, artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleSearch}>
              Search
            </Button>
            <Button variant="ghost" onClick={handleClearFilters}>
              Clear All
            </Button>
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Date</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Popularity</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" onClick={handleExportResults}>
              📊 Export Results
            </Button>
            <Button variant="ghost" onClick={handleBulkAction} broken={true}>
              ✅ Bulk Actions
            </Button>
            <Button variant="ghost" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
              {viewMode === 'grid' ? '📋 List View' : '⊞ Grid View'}
            </Button>
            <Button variant="ghost">
              🔔 Save Search
            </Button>
            <Button variant="ghost">
              📍 Near Me
            </Button>
            <Button variant="ghost">
              ⭐ Favorites Only
            </Button>
            <Button variant="ghost" broken={true}>
              🎫 Available Only
            </Button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              {loading ? 'Loading...' : `${filteredEvents.length} Events Found`}
            </h2>
            {searchTerm && (
              <p className="text-gray-600">Results for "{searchTerm}"</p>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              📤 Share Results
            </Button>
            <Button variant="ghost" size="sm">
              🔗 Copy Link
            </Button>
          </div>
        </div>

        {/* Events Grid/List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters.</p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleClearFilters}>
                Clear Filters
              </Button>
              <Button variant="ghost" onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && filteredEvents.length > 0 && (
          <div className="text-center mt-12">
            <Button size="lg" broken={true}>
              Load More Events
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;