import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for featured events
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
    }
  ];

  const categories = ['all', 'Music', 'Technology', 'Food', 'Art', 'Sports', 'Comedy'];

  useEffect(() => {
    // Simulate API call with random delay
    const loadEvents = async () => {
      setLoading(true);
      const delay = Math.random() * 2000 + 1000; // 1-3 seconds
      
      setTimeout(() => {
        // Intentional bug: sometimes returns empty array
        if (Math.random() > 0.8) {
          console.log('API Bug: Returning empty events array');
          setFeaturedEvents([]);
        } else {
          setFeaturedEvents(mockEvents);
        }
        setLoading(false);
      }, delay);
    };

    loadEvents();
  }, []);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    console.log('Category filter:', category);
  };

  const handleSearch = () => {
    console.log('Search term:', searchTerm);
    // Intentional bug: search doesn't actually filter
    alert('Search functionality coming soon!');
  };

  const handleNewsletterSignup = () => {
    // Bug: form submission doesn't validate email
    const email = (document.getElementById('newsletter-email') as HTMLInputElement)?.value;
    if (!email) {
      alert('Please enter your email');
      return;
    }
    console.log('Newsletter signup:', email);
    alert('Thanks for signing up!');
  };

  const filteredEvents = selectedCategory === 'all' 
    ? featuredEvents 
    : featuredEvents.filter(event => event.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Events
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find and book tickets for concerts, conferences, festivals, and more. 
            Your next great experience is just a click away!
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto flex gap-4 mb-8">
            <input
              type="text"
              placeholder="Search events, artists, venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button onClick={handleSearch} variant="secondary" size="lg">
              🔍 Search
            </Button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/events">
              <Button variant="secondary" size="lg">
                Browse All Events
              </Button>
            </Link>
            <Button variant="ghost" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              Create Event
            </Button>
            <Button variant="ghost" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              Gift Cards
            </Button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-6">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                variant={selectedCategory === category ? 'primary' : 'ghost'}
                className="capitalize"
              >
                {category === 'all' ? 'All Events' : category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Events</h2>
            <div className="flex gap-4">
              <Button variant="ghost" broken={true}>
                Filter
              </Button>
              <Button variant="ghost">
                Sort by Date
              </Button>
              <Button variant="ghost">
                Sort by Price
              </Button>
            </div>
          </div>

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
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or check back later.</p>
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EventHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Events Listed</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Cities Worldwide</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">Get notified about the latest events and exclusive offers!</p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <Button 
              onClick={handleNewsletterSignup}
              variant="secondary"
              size="lg"
            >
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm mt-4 opacity-75">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Quick Actions Footer */}
      <section className="py-8 bg-gray-800 text-white">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="ghost" className="text-white border-white hover:bg-white hover:text-gray-800">
              Help Center
            </Button>
            <Button variant="ghost" className="text-white border-white hover:bg-white hover:text-gray-800">
              Contact Us
            </Button>
            <Button variant="ghost" className="text-white border-white hover:bg-white hover:text-gray-800">
              Partner With Us
            </Button>
            <Button variant="ghost" className="text-white border-white hover:bg-white hover:text-gray-800">
              Mobile App
            </Button>
            <Button variant="ghost" className="text-white border-white hover:bg-white hover:text-gray-800">
              Gift Cards
            </Button>
            <Button variant="ghost" className="text-white border-white hover:bg-white hover:text-gray-800" broken={true}>
              Careers
            </Button>
            <Button variant="ghost" className="text-white border-white hover:bg-white hover:text-gray-800">
              Press
            </Button>
            <Button variant="ghost" className="text-white border-white hover:bg-white hover:text-gray-800">
              Terms
            </Button>
            <Button variant="ghost" className="text-white border-white hover:bg-white hover:text-gray-800">
              Privacy
            </Button>
            <Button variant="ghost" className="text-white border-white hover:bg-white hover:text-gray-800">
              About Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;