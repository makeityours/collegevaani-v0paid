import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, Eye, Globe } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for study abroad programs
const studyAbroadPrograms = [
  {
    id: 1,
    title: "MS in Computer Science",
    country: "United States",
    university: "Stanford University",
    duration: "2 Years",
    fees: "$50,000 per year",
    status: "active",
    featured: true,
    updatedAt: "2023-11-15",
  },
  {
    id: 2,
    title: "MBA",
    country: "United Kingdom",
    university: "London Business School",
    duration: "1.5 Years",
    fees: "£45,000 per year",
    status: "active",
    featured: true,
    updatedAt: "2023-11-14",
  },
  {
    id: 3,
    title: "MS in Data Science",
    country: "Canada",
    university: "University of Toronto",
    duration: "2 Years",
    fees: "CAD 40,000 per year",
    status: "active",
    featured: false,
    updatedAt: "2023-11-12",
  },
  {
    id: 4,
    title: "Bachelor of Engineering",
    country: "Australia",
    university: "University of Melbourne",
    duration: "4 Years",
    fees: "AUD 45,000 per year",
    status: "active",
    featured: false,
    updatedAt: "2023-11-10",
  },
  {
    id: 5,
    title: "MS in Artificial Intelligence",
    country: "Germany",
    university: "Technical University of Munich",
    duration: "2 Years",
    fees: "€20,000 per year",
    status: "pending",
    featured: false,
    updatedAt: "2023-11-08",
  },
  {
    id: 6,
    title: "PhD in Biotechnology",
    country: "Singapore",
    university: "National University of Singapore",
    duration: "4 Years",
    fees: "SGD 35,000 per year",
    status: "active",
    featured: true,
    updatedAt: "2023-11-05",
  },
]

export default function StudyAbroadPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Study Abroad</h1>
          <p className="text-muted-foreground">Manage study abroad programs and information</p>
        </div>
        <Button asChild>
          <Link href="/admin/study-abroad/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Program
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="grid gap-2 flex-1">
          <label htmlFor="search" className="text-sm font-medium">
            Search Programs
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="search" type="search" placeholder="Search by title, country, university..." className="pl-8" />
          </div>
        </div>
        <div className="grid gap-2 w-full md:w-[180px]">
          <label htmlFor="country-filter" className="text-sm font-medium">
            Country
          </label>
          <Select>
            <SelectTrigger id="country-filter">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
              <SelectItem value="germany">Germany</SelectItem>
              <SelectItem value="singapore">Singapore</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2 w-full md:w-[180px]">
          <label htmlFor="status-filter" className="text-sm font-medium">
            Status
          </label>
          <Select>
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
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
              <TableHead>Country</TableHead>
              <TableHead>University</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Fees</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studyAbroadPrograms.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="font-medium">{program.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    {program.country}
                  </div>
                </TableCell>
                <TableCell>{program.university}</TableCell>
                <TableCell>{program.duration}</TableCell>
                <TableCell>{program.fees}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      program.status === "active" ? "default" : program.status === "pending" ? "outline" : "secondary"
                    }
                  >
                    {program.status}
                  </Badge>
                </TableCell>
                <TableCell>{program.featured ? "Yes" : "No"}</TableCell>
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
                        <Link href={`/admin/study-abroad/${program.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/study-abroad/${program.id}/edit`}>
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
          Showing <strong>1-6</strong> of <strong>25</strong> programs
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
