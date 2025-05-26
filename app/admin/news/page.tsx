import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, Eye, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for news articles
const newsArticles = [
  {
    id: 1,
    title: "JEE Main 2024 Registration Begins Today",
    category: "Exam Updates",
    author: "Admin",
    publishDate: "2023-11-15",
    status: "published",
    featured: true,
  },
  {
    id: 2,
    title: "Top 10 Engineering Colleges in India for 2023",
    category: "College Rankings",
    author: "Editor",
    publishDate: "2023-11-14",
    status: "published",
    featured: true,
  },
  {
    id: 3,
    title: "New Medical College Approved in Maharashtra",
    category: "College News",
    author: "Admin",
    publishDate: "2023-11-12",
    status: "published",
    featured: false,
  },
  {
    id: 4,
    title: "NEET 2024: Important Changes in Exam Pattern",
    category: "Exam Updates",
    author: "Editor",
    publishDate: "2023-11-10",
    status: "published",
    featured: true,
  },
  {
    id: 5,
    title: "Study Abroad: New Scholarship Opportunities for Indian Students",
    category: "Scholarships",
    author: "Admin",
    publishDate: "2023-11-08",
    status: "draft",
    featured: false,
  },
  {
    id: 6,
    title: "Career Opportunities After B.Tech in 2024",
    category: "Career Guidance",
    author: "Editor",
    publishDate: "2023-11-05",
    status: "published",
    featured: false,
  },
]

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">News</h1>
          <p className="text-muted-foreground">Manage news articles and updates</p>
        </div>
        <Button asChild>
          <Link href="/admin/news/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Article
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="grid gap-2 flex-1">
          <label htmlFor="search" className="text-sm font-medium">
            Search Articles
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="search" type="search" placeholder="Search by title, category..." className="pl-8" />
          </div>
        </div>
        <div className="grid gap-2 w-full md:w-[180px]">
          <label htmlFor="category-filter" className="text-sm font-medium">
            Category
          </label>
          <Select>
            <SelectTrigger id="category-filter">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="exam-updates">Exam Updates</SelectItem>
              <SelectItem value="college-rankings">College Rankings</SelectItem>
              <SelectItem value="college-news">College News</SelectItem>
              <SelectItem value="scholarships">Scholarships</SelectItem>
              <SelectItem value="career-guidance">Career Guidance</SelectItem>
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
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
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
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Publish Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsArticles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {article.publishDate}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      article.status === "published" ? "default" : article.status === "draft" ? "outline" : "secondary"
                    }
                  >
                    {article.status}
                  </Badge>
                </TableCell>
                <TableCell>{article.featured ? "Yes" : "No"}</TableCell>
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
                        <Link href={`/admin/news/${article.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/news/${article.id}/edit`}>
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
          Showing <strong>1-6</strong> of <strong>20</strong> articles
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
