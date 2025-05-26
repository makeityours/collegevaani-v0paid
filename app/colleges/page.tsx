import Link from "next/link"
import Image from "next/image"
import {
  MapPin,
  Search,
  Filter,
  Star,
  ArrowRight,
  BookOpen,
  Users,
  Building,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CollegesPage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Colleges in India</h1>
          <p className="text-muted-foreground">Browse and filter through thousands of colleges across India</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 bg-muted/50 p-4 rounded-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search colleges by name, location..."
              className="w-full pl-9 rounded-lg border"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Course Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="management">Management</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <details className="bg-card rounded-lg border p-4">
            <summary className="font-semibold cursor-pointer">Filters</summary>
            <div className="mt-4">
              <Accordion type="multiple" defaultValue={["location", "course", "fees", "rating"]}>
                <AccordionItem value="location">
                  <AccordionTrigger>Location</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata"].map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox id={`mobile-location-${location.toLowerCase()}`} />
                          <label
                            htmlFor={`mobile-location-${location.toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="course">
                  <AccordionTrigger>Course Type</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Engineering", "Medical", "Management", "Science", "Arts", "Commerce", "Law"].map((course) => (
                        <div key={course} className="flex items-center space-x-2">
                          <Checkbox id={`course-${course.toLowerCase()}`} />
                          <label
                            htmlFor={`course-${course.toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {course}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="fees">
                  <AccordionTrigger>Fees Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Under ₹1 Lakh", "₹1-3 Lakh", "₹3-5 Lakh", "₹5-10 Lakh", "₹10-15 Lakh", "Above ₹15 Lakh"].map(
                        (fee) => (
                          <div key={fee} className="flex items-center space-x-2">
                            <Checkbox id={`fee-${fee.replace(/\s+/g, "-").toLowerCase()}`} />
                            <label
                              htmlFor={`fee-${fee.replace(/\s+/g, "-").toLowerCase()}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {fee}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="rating">
                  <AccordionTrigger>Rating</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["4.5 & above", "4.0 & above", "3.5 & above", "3.0 & above"].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox id={`rating-${rating.replace(/\s+/g, "-").toLowerCase()}`} />
                          <label
                            htmlFor={`rating-${rating.replace(/\s+/g, "-").toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {rating}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="facilities">
                  <AccordionTrigger>Facilities</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Hostel", "Sports", "Library", "Labs", "Cafeteria", "Gym", "Wi-Fi"].map((facility) => (
                        <div key={facility} className="flex items-center space-x-2">
                          <Checkbox id={`facility-${facility.toLowerCase()}`} />
                          <label
                            htmlFor={`facility-${facility.toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {facility}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4 space-y-2">
                <Button className="w-full">Apply Filters</Button>
                <Button variant="outline" className="w-full">
                  Reset
                </Button>
              </div>
            </div>
          </details>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="hidden md:block">
            <div className="bg-card rounded-lg border p-4 sticky top-20">
              <h3 className="font-semibold mb-4">Filters</h3>

              <Accordion type="multiple" defaultValue={["location", "course", "fees", "rating"]}>
                <AccordionItem value="location">
                  <AccordionTrigger>Location</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata"].map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox id={`location-${location.toLowerCase()}`} />
                          <label
                            htmlFor={`location-${location.toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="course">
                  <AccordionTrigger>Course Type</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Engineering", "Medical", "Management", "Science", "Arts", "Commerce", "Law"].map((course) => (
                        <div key={course} className="flex items-center space-x-2">
                          <Checkbox id={`course-${course.toLowerCase()}`} />
                          <label
                            htmlFor={`course-${course.toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {course}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="fees">
                  <AccordionTrigger>Fees Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Under ₹1 Lakh", "₹1-3 Lakh", "₹3-5 Lakh", "₹5-10 Lakh", "₹10-15 Lakh", "Above ₹15 Lakh"].map(
                        (fee) => (
                          <div key={fee} className="flex items-center space-x-2">
                            <Checkbox id={`fee-${fee.replace(/\s+/g, "-").toLowerCase()}`} />
                            <label
                              htmlFor={`fee-${fee.replace(/\s+/g, "-").toLowerCase()}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {fee}
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="rating">
                  <AccordionTrigger>Rating</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["4.5 & above", "4.0 & above", "3.5 & above", "3.0 & above"].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox id={`rating-${rating.replace(/\s+/g, "-").toLowerCase()}`} />
                          <label
                            htmlFor={`rating-${rating.replace(/\s+/g, "-").toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {rating}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="facilities">
                  <AccordionTrigger>Facilities</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {["Hostel", "Sports", "Library", "Labs", "Cafeteria", "Gym", "Wi-Fi"].map((facility) => (
                        <div key={facility} className="flex items-center space-x-2">
                          <Checkbox id={`facility-${facility.toLowerCase()}`} />
                          <label
                            htmlFor={`facility-${facility.toLowerCase()}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {facility}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-4 space-y-2">
                <Button className="w-full">Apply Filters</Button>
                <Button variant="outline" className="w-full">
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* College Listings */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <p className="text-muted-foreground">Showing 1-10 of 1,234 colleges</p>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating-high">Rating: High to Low</SelectItem>
                  <SelectItem value="rating-low">Rating: Low to High</SelectItem>
                  <SelectItem value="fees-high">Fees: High to Low</SelectItem>
                  <SelectItem value="fees-low">Fees: Low to High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <Card key={i} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col">
                    <div className="relative h-48 md:h-auto md:w-1/3">
                      <Image
                        src={`/placeholder.svg?height=200&width=300&text=College ${i}`}
                        alt={`College ${i}`}
                        fill
                        className="object-cover"
                      />
                      {i % 3 === 0 && (
                        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">Featured</Badge>
                      )}
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                            <Link href={`/colleges/${i}`}>
                              {i % 2 === 0 ? "Indian Institute of Technology" : "National Institute of Technology"}{" "}
                              {i % 5 === 0 ? "Delhi" : i % 3 === 0 ? "Mumbai" : "Bangalore"}
                            </Link>
                          </h3>
                          <p className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="mr-1 h-3 w-3" />
                            {i % 5 === 0 ? "Delhi" : i % 3 === 0 ? "Mumbai" : "Bangalore"}, India
                          </p>
                        </div>
                        <div className="flex items-center bg-primary/10 text-primary rounded-md px-2 py-1">
                          <Star className="h-3 w-3 fill-primary mr-1" />
                          <span className="text-sm font-medium">{4 + (i % 10) / 10}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                        <div className="flex items-start gap-1.5">
                          <BookOpen className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            {i % 3 === 0
                              ? "Engineering, Science, Technology"
                              : i % 2 === 0
                                ? "Engineering, Computer Science"
                                : "Engineering, Architecture"}
                          </span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Users className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{100 + i * 50} reviews</span>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center gap-1.5">
                        <Building className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-sm font-medium">Fees:</span>
                        <span className="text-sm text-muted-foreground">
                          {i % 3 === 0
                            ? "₹2.2L - ₹2.5L per year"
                            : i % 2 === 0
                              ? "₹1.8L - ₹2.2L per year"
                              : "₹1.5L - ₹1.8L per year"}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-background">
                          NIRF Rank: {i * 5}
                        </Badge>
                        <Badge variant="outline" className="bg-background">
                          Hostel
                        </Badge>
                        <Badge variant="outline" className="bg-background">
                          Placement
                        </Badge>
                        {i % 2 === 0 && (
                          <Badge variant="outline" className="bg-background">
                            Scholarship
                          </Badge>
                        )}
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <Button variant="outline" size="sm">
                          Compare
                        </Button>
                        <Button size="sm" className="group">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous</span>
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button key={page} variant={page === 1 ? "default" : "outline"} size="icon" className="w-8 h-8">
                    {page}
                  </Button>
                ))}
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
