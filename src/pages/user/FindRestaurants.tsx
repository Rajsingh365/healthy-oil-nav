import { useMemo, useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Clock, Phone, Search } from "lucide-react";
import { motion } from "framer-motion";

interface Restaurant {
  id: number;
  name: string;
  location: string;
  rating: number;
  cuisine: string;
  certification: string;
  description: string;
  timings: string;
  phone: string;
  menu: string[]; // searchable items
}

const DATA: Restaurant[] = [
  {
    id: 1,
    name: "Tandoor Treats",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    cuisine: "North Indian",
    certification: "Healthy Oil Certified 🏅",
    description: "Traditional tandoor cooking with minimal oil usage",
    timings: "11:00 AM - 11:00 PM",
    phone: "+91 98765 43210",
    menu: ["Tandoori Chicken", "Butter Naan", "Dal Makhani", "Paneer Tikka"],
  },
  {
    id: 2,
    name: "Swaad Punjab",
    location: "Delhi, NCR",
    rating: 4.6,
    cuisine: "Punjabi",
    certification: "Healthy Oil Certified 🏅",
    description: "Authentic Punjabi flavors with reduced oil cooking",
    timings: "10:00 AM - 10:30 PM",
    phone: "+91 98765 43211",
    menu: ["Butter Chicken", "Rajma", "Chole Bhature", "Paratha"],
  },
  {
    id: 3,
    name: "Idli Express",
    location: "Chennai, Tamil Nadu",
    rating: 4.9,
    cuisine: "South Indian",
    certification: "Healthy Oil Certified 🏅",
    description:
      "Traditional South Indian breakfast with healthy cooking methods",
    timings: "6:00 AM - 2:00 PM",
    phone: "+91 98765 43212",
    menu: ["Idli", "Dosa", "Sambhar", "Upma", "Poha"],
  },
  {
    id: 4,
    name: "Savory Street",
    location: "Pune, Maharashtra",
    rating: 4.5,
    cuisine: "Street Food",
    certification: "Healthy Oil Certified 🏅",
    description: "Popular snacks cooked with healthy oil practices",
    timings: "8:00 AM - 10:00 PM",
    phone: "+91 98765 43213",
    menu: ["Poha", "Misal Pav", "Bhel", "Dahi Puri"],
  },
  {
    id: 5,
    name: "Central Canteen",
    location: "Indore, Madhya Pradesh",
    rating: 4.4,
    cuisine: "Indian",
    certification: "Healthy Oil Certified 🏅",
    description: "Mess and canteen style food with oil-conscious cooking",
    timings: "7:00 AM - 9:30 PM",
    phone: "+91 98765 43214",
    menu: ["Poha", "Jalebi", "Thali", "Vegetable Curry"],
  },
];

export default function FindRestaurants() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DATA;
    return DATA.filter((r) => r.menu.some((m) => m.toLowerCase().includes(q)));
  }, [query]);

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-2xl font-bold">Find Certified Restaurants</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Search for a dish (e.g., "poha") and see certified places offering
            it.
          </p>
          <div className="relative">
            <Input
              placeholder="Search dish name (e.g., Poha)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground">
              No restaurants found for "{query}".
            </Card>
          ) : (
            results.map((restaurant, idx) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {restaurant.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {restaurant.location}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      >
                        {restaurant.certification}
                      </Badge>
                    </div>

                    {/* Rating and Cuisine */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {restaurant.rating}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {restaurant.cuisine} Cuisine
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">
                      {restaurant.description}
                    </p>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{restaurant.timings}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`tel:${restaurant.phone}`}
                          className="text-sm underline"
                        >
                          {restaurant.phone}
                        </a>
                      </div>
                    </div>

                    {/* Menu badges (subset) */}
                    <div>
                      <p className="text-sm font-medium mb-2">
                        Menu Highlights:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.menu.slice(0, 6).map((item, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
