import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Phone } from "lucide-react";
import { motion } from "framer-motion";

const Partnerships = () => {
  const certifiedRestaurants = [
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
      specialties: ["Tandoori Chicken", "Naan", "Dal Makhani"],
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
      specialties: ["Butter Chicken", "Rajma", "Chole Bhature"],
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
      specialties: ["Idli", "Dosa", "Sambhar"],
    },
  ];

  return (
    <MobileLayout>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">🤝 Partnerships</h1>
          <p className="text-muted-foreground">
            Discover restaurants committed to healthy oil usage
          </p>
        </div>

        {/* Certification Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <div className="text-center space-y-3">
              <div className="text-4xl">🏅</div>
              <h2 className="text-lg font-semibold text-green-700 dark:text-green-400">
                Healthy Oil Certified
              </h2>
              <p className="text-sm text-muted-foreground">
                These restaurants have committed to using 30% less oil in their
                cooking while maintaining authentic flavors and quality.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Restaurant Cards */}
        <div className="space-y-4">
          {certifiedRestaurants.map((restaurant, idx) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
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
                      <span className="text-sm">{restaurant.phone}</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <p className="text-sm font-medium mb-2">Popular Dishes:</p>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.specialties.map((specialty, specialtyIdx) => (
                        <Badge
                          key={specialtyIdx}
                          variant="outline"
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6 text-center bg-primary/5 border-primary/20">
            <h3 className="text-lg font-semibold mb-2">
              Want to Partner with Us?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join our network of healthy oil certified restaurants and help
              promote healthier cooking practices across India.
            </p>
            <div className="text-xs text-muted-foreground">
              Contact: partnerships@healthyoil.in
            </div>
          </Card>
        </motion.div>
      </div>
    </MobileLayout>
  );
};

export default Partnerships;
