import PartnerMobileLayout from "@/components/layout/PartnerMobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Utensils, Search, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Dish {
  id: number;
  name: string;
  category: "Breakfast" | "Snacks" | "Main";
  oilMl: number; // avg oil used per serving
}

type OilLevel = "Low" | "Medium" | "High";

function levelFromOil(oilMl: number): OilLevel {
  if (oilMl <= 15) return "Low";
  if (oilMl <= 30) return "Medium";
  return "High";
}

const initialDishes: Dish[] = [
  { id: 1, name: "Paneer Tikka", category: "Snacks", oilMl: 25 },
  { id: 2, name: "Poha", category: "Breakfast", oilMl: 10 },
  { id: 3, name: "Masala Dosa", category: "Breakfast", oilMl: 20 },
  { id: 4, name: "Chole Bhature", category: "Main", oilMl: 40 },
  { id: 5, name: "Idli", category: "Breakfast", oilMl: 5 },
  { id: 6, name: "Aloo Paratha", category: "Main", oilMl: 28 },
];

export default function PartnerMenuLabeling() {
  const [dishes, setDishes] = useState<Dish[]>(initialDishes);
  const [q, setQ] = useState("");
  const [levelFilter, setLevelFilter] = useState<OilLevel | "All">("All");
  const [catFilter, setCatFilter] = useState<Dish["category"] | "All">("All");
  const { toast } = useToast();

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] =
    useState<Dish["category"]>("Breakfast");
  const [formOilMl, setFormOilMl] = useState([15]);

  const filtered = useMemo(() => {
    return dishes.filter((d) => {
      const lvl = levelFromOil(d.oilMl);
      const matchesQ = d.name.toLowerCase().includes(q.toLowerCase());
      const matchesLevel = levelFilter === "All" || lvl === levelFilter;
      const matchesCat = catFilter === "All" || d.category === catFilter;
      return matchesQ && matchesLevel && matchesCat;
    });
  }, [dishes, q, levelFilter, catFilter]);

  const updateOil = (id: number, value: number[]) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, oilMl: value[0] } : d))
    );
  };

  // CRUD Operations
  const handleAddDish = () => {
    if (!formName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a dish name",
        variant: "destructive",
      });
      return;
    }

    const newDish: Dish = {
      id: Math.max(...dishes.map((d) => d.id), 0) + 1,
      name: formName,
      category: formCategory,
      oilMl: formOilMl[0],
    };

    setDishes((prev) => [...prev, newDish]);
    setIsAddModalOpen(false);
    setFormName("");
    setFormCategory("Breakfast");
    setFormOilMl([15]);

    toast({
      title: "Success",
      description: `${formName} has been added to the menu`,
    });
  };

  const handleEditDish = () => {
    if (!editingDish || !formName.trim()) return;

    setDishes((prev) =>
      prev.map((d) =>
        d.id === editingDish.id
          ? {
              ...d,
              name: formName,
              category: formCategory,
              oilMl: formOilMl[0],
            }
          : d
      )
    );

    setIsEditModalOpen(false);
    setEditingDish(null);
    setFormName("");
    setFormCategory("Breakfast");
    setFormOilMl([15]);

    toast({
      title: "Success",
      description: `${formName} has been updated`,
    });
  };

  const handleDeleteDish = (id: number, name: string) => {
    setDishes((prev) => prev.filter((d) => d.id !== id));
    toast({
      title: "Deleted",
      description: `${name} has been removed from the menu`,
    });
  };

  const openEditModal = (dish: Dish) => {
    setEditingDish(dish);
    setFormName(dish.name);
    setFormCategory(dish.category);
    setFormOilMl([dish.oilMl]);
    setIsEditModalOpen(true);
  };

  const LevelBadge = ({ level }: { level: OilLevel }) => (
    <Badge
      className={cn(
        level === "Low" &&
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
        level === "Medium" &&
          "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
        level === "High" &&
          "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
      )}
    >
      {level}
    </Badge>
  );

  return (
    <PartnerMobileLayout>
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Utensils className="h-5 w-5" /> Menu Labeling
            </CardTitle>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add Dish
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Dish</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dishName">Dish Name</Label>
                    <Input
                      id="dishName"
                      placeholder="e.g., Dal Makhani"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formCategory}
                      onValueChange={(v) =>
                        setFormCategory(v as Dish["category"])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                        <SelectItem value="Snacks">Snacks</SelectItem>
                        <SelectItem value="Main">Main</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Oil per serving (ml)</Label>
                    <div className="flex items-center gap-3">
                      <Slider
                        value={formOilMl}
                        onValueChange={setFormOilMl}
                        min={0}
                        max={50}
                        step={1}
                        className="flex-1"
                      />
                      <div className="w-14 text-right text-sm tabular-nums">
                        {formOilMl[0]}ml
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleAddDish} className="w-full">
                    Add Dish
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search dishes..."
                  className="pl-8"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:col-span-1">
              <Select
                value={levelFilter}
                onValueChange={(v) => setLevelFilter(v as OilLevel | "All")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Oil Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Levels</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-1">
              <Select
                value={catFilter}
                onValueChange={(v) =>
                  setCatFilter(v as Dish["category"] | "All")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Breakfast">Breakfast</SelectItem>
                  <SelectItem value="Snacks">Snacks</SelectItem>
                  <SelectItem value="Main">Main</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Dish</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editDishName">Dish Name</Label>
                <Input
                  id="editDishName"
                  placeholder="e.g., Dal Makhani"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editCategory">Category</Label>
                <Select
                  value={formCategory}
                  onValueChange={(v) => setFormCategory(v as Dish["category"])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Breakfast">Breakfast</SelectItem>
                    <SelectItem value="Snacks">Snacks</SelectItem>
                    <SelectItem value="Main">Main</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Oil per serving (ml)</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    value={formOilMl}
                    onValueChange={setFormOilMl}
                    min={0}
                    max={50}
                    step={1}
                    className="flex-1"
                  />
                  <div className="w-14 text-right text-sm tabular-nums">
                    {formOilMl[0]}ml
                  </div>
                </div>
              </div>

              <Button onClick={handleEditDish} className="w-full">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((d) => {
            const lvl = levelFromOil(d.oilMl);
            return (
              <Card key={d.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base">{d.name}</CardTitle>
                      <div className="text-xs text-muted-foreground">
                        {d.category}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <div className="flex items-center gap-1">
                        <LevelBadge level={lvl} />
                        {lvl === "Low" && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5"
                          >
                            Healthy
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2"
                          onClick={() => openEditModal(d)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2"
                          onClick={() => handleDeleteDish(d.id, d.name)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Oil per serving
                    </div>
                    <div className="flex items-center gap-3">
                      <Slider
                        value={[d.oilMl]}
                        min={0}
                        max={50}
                        step={1}
                        onValueChange={(v) => updateOil(d.id, v)}
                        className="flex-1"
                      />
                      <div className="w-10 text-right text-sm tabular-nums">
                        {d.oilMl}ml
                      </div>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="text-muted-foreground">
                      Consumer preview:{" "}
                    </span>
                    {lvl === "Low" ? (
                      <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/40">
                        Healthy Choice <span aria-hidden>🟢</span>
                      </span>
                    ) : lvl === "Medium" ? (
                      <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/40">
                        Moderate Oil <span aria-hidden>🟡</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40">
                        High Oil <span aria-hidden>🔴</span>
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PartnerMobileLayout>
  );
}
