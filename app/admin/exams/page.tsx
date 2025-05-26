import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for exams
const exams = [
  {
    id: 1,
    name: "JEE Main 2024",
    fullName: "Joint Entrance Examination Main",
    type: "Engineering",
    examDate: "January 24 - February 1, 2024",
    registrationEnd: "November 30, 2023",
    status: "upcoming",
    updatedAt: "2023-11-15",
  },
  {
    id: 2,
    name: "NEET UG 2024",
    fullName: "National Eligibility cum Entrance Test Undergraduate",
    type: "Medical",
    examDate: "May 5, 2024",
    registrationEnd: "December 15, 2023",
    status: "upcoming",
    updatedAt: "2023-11-14",
  },
  {
    id: 3,
    name: "CAT 2023",
    fullName: "Common Admission Test",
    type: "Management",
    examDate: "November 26, 2023",
    registrationEnd: "September 20, 2023",
    status: "ongoing",
    updatedAt: "2023-11-12",
  },
  {
    id: 4,
    name: "GATE 2024",
    fullName: "Graduate Aptitude Test in Engineering",
    type: "Engineering",
    examDate: "February 3-11, 2024",
    registrationEnd: "October 5, 2023",
    status: "upcoming",
    updatedAt: "2023-11-10",
  },
  {
    id: 5,
    name: "CLAT 2024",
    fullName: "Common Law Admission Test",
    type: "Law",
    examDate: "December 3, 2023",
    registrationEnd: "October 15, 2023",
    status: "upcoming",
    updatedAt: "2023-11-08",
  },
  {
    id: 6,
    name: "NATA 2024",
    fullName: "National Aptitude Test in Architecture",
    type: "Design",
    examDate: "April 20, 2024",
    registrationEnd: "March 15, 2024",
    status: "upcoming",
    updatedAt: "2023-11-05",
  },
]

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Exams</h1>
          <p className="text-muted-foreground">Manage entrance exam listings and information</p>
        </div>
        <Button asChild>
          <Link href="/admin/exams/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Exam
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="grid gap-2 flex-1">
          <label htmlFor="search" className="text-sm font-medium">
            Search Exams
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="search" type="search" placeholder="Search by name, type..." className="pl-8" />
          </div>
        </div>
        <div className="grid gap-2 w-full md:w-[180px]">
          <label htmlFor="type-filter" className="text-sm font-medium">
            Exam Type
          </label>
          <Select>
            <SelectTrigger id="type-filter">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="management">Management</SelectItem>
              <SelectItem value="law">Law</SelectItem>
              <SelectItem value="design">Design</SelectItem>
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
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
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
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Exam Date</TableHead>
              <TableHead>Registration Ends</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell className="font-medium">
                  <div>
                    <div>{exam.name}</div>
                    <div className="text-xs text-muted-foreground">{exam.fullName}</div>
                  </div>
                </TableCell>
                <TableCell>{exam.type}</TableCell>
                <TableCell>{exam.examDate}</TableCell>
                <TableCell>{exam.registrationEnd}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      exam.status === "upcoming" ? "default" : exam.status === "ongoing" ? "outline" : "secondary"
                    }
                  >
                    {exam.status}
                  </Badge>
                </TableCell>
                <TableCell>{exam.updatedAt}</TableCell>
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
                        <Link href={`/admin/exams/${exam.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/exams/${exam.id}/edit`}>
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
          Showing <strong>1-6</strong> of <strong>30</strong> exams
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
