import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for courses
const courses = [
  {
    id: 1,
    title: "Bachelor of Technology (B.Tech)",
    level: "Undergraduate",
    stream: "Engineering",
    duration: "4 Years",
    status: "active",
    featured: true,
    updatedAt: "2023-11-15",
  },
  {
    id: 2,
    title: "Bachelor of Medicine and Surgery (MBBS)",
    level: "Undergraduate",
    stream: "Medical",
    duration: "5.5 Years",
    status: "active",
    featured: true,
    updatedAt: "2023-11-14",
  },
  {
    id: 3,
    title: "Master of Business Administration (MBA)",
    level: "Postgraduate",
    stream: "Management",
    duration: "2 Years",
    status: "active",
    featured: true,
    updatedAt: "2023-11-12",
  },
  {
    id: 4,
    title: "Bachelor of Computer Applications (BCA)",
    level: "Undergraduate",
    stream: "Computer Science",
    duration: "3 Years",
    status: "active",
    featured: false,
    updatedAt: "2023-11-10",
  },
  {
    id: 5,
    title: "Bachelor of Science in Data Science",
    level: "Undergraduate",
    stream: "Science",
    duration: "3 Years",
    status: "active",
    featured: true,
    updatedAt: "2023-11-08",
  },
  {
    id: 6,
    title: "Bachelor of Arts in Psychology",
    level: "Undergraduate",
    stream: "Arts",
    duration: "3 Years",
    status: "active",
    featured: false,
    updatedAt: "2023-11-05",
  },
  {
    id: 7,
    title: "Master of Computer Applications (MCA)",
    level: "Postgraduate",
    stream: "Computer Science",
    duration: "2 Years",
    status: "pending",
    featured: false,
    updatedAt: "2023-11-03",
  },
]

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">Manage course listings and information</p>
        </div>
        <Button asChild>
          <Link href="/admin/courses/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="grid gap-2 flex-1">
          <label htmlFor="search" className="text-sm font-medium">
            Search Courses
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="search" type="search" placeholder="Search by title, stream..." className="pl-8" />
          </div>
        </div>
        <div className="grid gap-2 w-full md:w-[180px]">
          <label htmlFor="level-filter" className="text-sm font-medium">
            Level
          </label>
          <Select>
            <SelectTrigger id="level-filter">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="undergraduate">Undergraduate</SelectItem>
              <SelectItem value="postgraduate">Postgraduate</SelectItem>
              <SelectItem value="diploma">Diploma</SelectItem>
              <SelectItem value="certificate">Certificate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2 w-full md:w-[180px]">
          <label htmlFor="stream-filter" className="text-sm font-medium">
            Stream
          </label>
          <Select>
            <SelectTrigger id="stream-filter">
              <SelectValue placeholder="All Streams" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Streams</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="management">Management</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="arts">Arts</SelectItem>
              <SelectItem value="commerce">Commerce</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Stream</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.level}</TableCell>
                <TableCell>{course.stream}</TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      course.status === "active" ? "default" : course.status === "pending" ? "outline" : "secondary"
                    }
                  >
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell>{course.featured ? "Yes" : "No"}</TableCell>
                <TableCell>{course.updatedAt}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/courses/${course.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/courses/${course.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1-7</strong> of <strong>50</strong> courses
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
