import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for colleges
const colleges = [
  {
    id: 1,
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi",
    type: "Public/Government",
    status: "active",
    featured: true,
    updatedAt: "2023-11-15",
  },
  {
    id: 2,
    name: "All India Institute of Medical Sciences",
    location: "New Delhi",
    type: "Public/Government",
    status: "active",
    featured: true,
    updatedAt: "2023-11-14",
  },
  {
    id: 3,
    name: "Indian Institute of Management",
    location: "Ahmedabad",
    type: "Public/Government",
    status: "active",
    featured: false,
    updatedAt: "2023-11-12",
  },
  {
    id: 4,
    name: "Delhi University",
    location: "Delhi",
    type: "Public/Government",
    status: "active",
    featured: false,
    updatedAt: "2023-11-10",
  },
  {
    id: 5,
    name: "Birla Institute of Technology",
    location: "Pilani",
    type: "Private",
    status: "active",
    featured: false,
    updatedAt: "2023-11-08",
  },
  {
    id: 6,
    name: "National Law School of India University",
    location: "Bangalore",
    type: "Public/Government",
    status: "active",
    featured: true,
    updatedAt: "2023-11-05",
  },
  {
    id: 7,
    name: "Manipal Institute of Technology",
    location: "Manipal",
    type: "Private",
    status: "pending",
    featured: false,
    updatedAt: "2023-11-03",
  },
]

export default function CollegesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Colleges</h1>
          <p className="text-muted-foreground">Manage college listings and information</p>
        </div>
        <Button asChild>
          <Link href="/admin/colleges/new">
            <Plus className="mr-2 h-4 w-4" />
            Add College
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="grid gap-2 flex-1">
          <label htmlFor="search" className="text-sm font-medium">
            Search Colleges
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="search" type="search" placeholder="Search by name, location..." className="pl-8" />
          </div>
        </div>
        <div className="grid gap-2 w-full md:w-[180px]">
          <label htmlFor="type-filter" className="text-sm font-medium">
            College Type
          </label>
          <Select>
            <SelectTrigger id="type-filter">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="public">Public/Government</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="deemed">Deemed</SelectItem>
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

      <div className="border rounded-md overflow-x-auto">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colleges.map((college) => (
              <TableRow key={college.id}>
                <TableCell className="font-medium">{college.name}</TableCell>
                <TableCell>{college.location}</TableCell>
                <TableCell>{college.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      college.status === "active" ? "default" : college.status === "pending" ? "outline" : "secondary"
                    }
                  >
                    {college.status}
                  </Badge>
                </TableCell>
                <TableCell>{college.featured ? "Yes" : "No"}</TableCell>
                <TableCell>{college.updatedAt}</TableCell>
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
                        <Link href={`/admin/colleges/${college.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/colleges/${college.id}/edit`}>
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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1-7</strong> of <strong>100</strong> colleges
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
