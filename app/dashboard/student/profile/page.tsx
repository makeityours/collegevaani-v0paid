"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardCard } from "@/components/dashboard/dashboard-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Camera, Save, Edit, FileText } from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/dashboard/student", iconName: "home" },
  { name: "Profile", href: "/dashboard/student/profile", iconName: "users" },
  { name: "Applications", href: "/dashboard/student/applications", iconName: "file-text" },
  { name: "Documents", href: "/dashboard/student/documents", iconName: "upload" },
  { name: "Messages", href: "/dashboard/student/messages", iconName: "message-square" },
  { name: "Payments", href: "/dashboard/student/payments", iconName: "credit-card" },
  { name: "Recommendations", href: "/dashboard/student/recommendations", iconName: "star" },
  { name: "Saved Colleges", href: "/dashboard/student/saved", iconName: "bookmark" },
  { name: "Counseling", href: "/dashboard/student/counseling", iconName: "calendar" },
  { name: "Settings", href: "/dashboard/student/settings", iconName: "settings" },
]

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 9876543210",
    dateOfBirth: "2005-03-15",
    gender: "male",
    address: "123 Main Street, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    fatherName: "Suresh Sharma",
    motherName: "Sunita Sharma",
    category: "General",
    nationality: "Indian",
  })

  const [academicData, setAcademicData] = useState({
    class10Board: "CBSE",
    class10School: "Delhi Public School",
    class10Year: "2021",
    class10Percentage: "95.2",
    class12Board: "CBSE",
    class12School: "Delhi Public School",
    class12Year: "2023",
    class12Percentage: "92.4",
    class12Stream: "Science (PCM)",
    jeeMainScore: "96.8",
    jeeAdvancedRank: "1205",
    neetScore: "",
    otherExams: "BITSAT: 345/400",
  })

  const profileCompletion = 85

  return (
    <DashboardLayout navItems={navItems} userType="Student" userName="Rahul Sharma" userInitials="RS">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">Manage your personal information and academic records</p>
          </div>
          <div className="flex flex-col xs:flex-row gap-2">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className="w-full xs:w-auto"
            >
              {isEditing ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Profile Completion */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Profile Completion</h3>
                  <span className="text-sm font-medium">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Complete your profile to get better college recommendations
                </p>
              </div>
              <div className="text-right">
                <Badge variant={profileCompletion >= 80 ? "default" : "outline"}>
                  {profileCompletion >= 80 ? "Almost Complete" : "Incomplete"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="academic">Academic Records</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Profile Picture */}
              <DashboardCard title="Profile Picture">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                    <AvatarFallback className="text-2xl">RS</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Camera className="mr-2 h-4 w-4" />
                      Change Photo
                    </Button>
                    <Button size="sm" variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Recommended: Square image, at least 400x400px
                  </p>
                </div>
              </DashboardCard>

              {/* Personal Information */}
              <DashboardCard title="Personal Information" className="lg:col-span-2">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={profileData.gender}
                      onValueChange={(value) => setProfileData({ ...profileData, gender: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DashboardCard>
            </div>

            {/* Address Information */}
            <DashboardCard title="Address Information">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2 md:col-span-2 lg:col-span-3">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    disabled={!isEditing}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={profileData.city}
                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={profileData.state}
                    onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    value={profileData.pincode}
                    onChange={(e) => setProfileData({ ...profileData, pincode: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </DashboardCard>

            {/* Family Information */}
            <DashboardCard title="Family Information">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fatherName">Father's Name</Label>
                  <Input
                    id="fatherName"
                    value={profileData.fatherName}
                    onChange={(e) => setProfileData({ ...profileData, fatherName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motherName">Mother's Name</Label>
                  <Input
                    id="motherName"
                    value={profileData.motherName}
                    onChange={(e) => setProfileData({ ...profileData, motherName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={profileData.category}
                    onValueChange={(value) => setProfileData({ ...profileData, category: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="OBC">OBC</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="ST">ST</SelectItem>
                      <SelectItem value="EWS">EWS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={profileData.nationality}
                    onChange={(e) => setProfileData({ ...profileData, nationality: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </DashboardCard>
          </TabsContent>

          <TabsContent value="academic" className="space-y-4">
            {/* Class 10 Details */}
            <DashboardCard title="Class 10 Details">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="class10Board">Board</Label>
                  <Select
                    value={academicData.class10Board}
                    onValueChange={(value) => setAcademicData({ ...academicData, class10Board: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select board" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CBSE">CBSE</SelectItem>
                      <SelectItem value="ICSE">ICSE</SelectItem>
                      <SelectItem value="State Board">State Board</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class10School">School Name</Label>
                  <Input
                    id="class10School"
                    value={academicData.class10School}
                    onChange={(e) => setAcademicData({ ...academicData, class10School: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class10Year">Passing Year</Label>
                  <Input
                    id="class10Year"
                    value={academicData.class10Year}
                    onChange={(e) => setAcademicData({ ...academicData, class10Year: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class10Percentage">Percentage/CGPA</Label>
                  <Input
                    id="class10Percentage"
                    value={academicData.class10Percentage}
                    onChange={(e) => setAcademicData({ ...academicData, class10Percentage: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </DashboardCard>

            {/* Class 12 Details */}
            <DashboardCard title="Class 12 Details">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="class12Board">Board</Label>
                  <Select
                    value={academicData.class12Board}
                    onValueChange={(value) => setAcademicData({ ...academicData, class12Board: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select board" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CBSE">CBSE</SelectItem>
                      <SelectItem value="ICSE">ICSE</SelectItem>
                      <SelectItem value="State Board">State Board</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class12School">School Name</Label>
                  <Input
                    id="class12School"
                    value={academicData.class12School}
                    onChange={(e) => setAcademicData({ ...academicData, class12School: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class12Year">Passing Year</Label>
                  <Input
                    id="class12Year"
                    value={academicData.class12Year}
                    onChange={(e) => setAcademicData({ ...academicData, class12Year: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class12Percentage">Percentage/CGPA</Label>
                  <Input
                    id="class12Percentage"
                    value={academicData.class12Percentage}
                    onChange={(e) => setAcademicData({ ...academicData, class12Percentage: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="class12Stream">Stream</Label>
                  <Select
                    value={academicData.class12Stream}
                    onValueChange={(value) => setAcademicData({ ...academicData, class12Stream: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select stream" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Science (PCM)">Science (PCM)</SelectItem>
                      <SelectItem value="Science (PCB)">Science (PCB)</SelectItem>
                      <SelectItem value="Science (PCMB)">Science (PCMB)</SelectItem>
                      <SelectItem value="Commerce">Commerce</SelectItem>
                      <SelectItem value="Arts">Arts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DashboardCard>

            {/* Entrance Exam Scores */}
            <DashboardCard title="Entrance Exam Scores">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="jeeMainScore">JEE Main Percentile</Label>
                  <Input
                    id="jeeMainScore"
                    value={academicData.jeeMainScore}
                    onChange={(e) => setAcademicData({ ...academicData, jeeMainScore: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Enter percentile"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jeeAdvancedRank">JEE Advanced Rank</Label>
                  <Input
                    id="jeeAdvancedRank"
                    value={academicData.jeeAdvancedRank}
                    onChange={(e) => setAcademicData({ ...academicData, jeeAdvancedRank: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Enter rank"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neetScore">NEET Score</Label>
                  <Input
                    id="neetScore"
                    value={academicData.neetScore}
                    onChange={(e) => setAcademicData({ ...academicData, neetScore: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Enter score"
                  />
                </div>
                <div className="space-y-2 md:col-span-2 lg:col-span-3">
                  <Label htmlFor="otherExams">Other Exam Scores</Label>
                  <Textarea
                    id="otherExams"
                    value={academicData.otherExams}
                    onChange={(e) => setAcademicData({ ...academicData, otherExams: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Enter other exam scores (BITSAT, VITEEE, etc.)"
                    rows={2}
                  />
                </div>
              </div>
            </DashboardCard>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <DashboardCard title="Course Preferences">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Select your preferred courses and specializations to get personalized recommendations.
                </p>
                {/* Course preferences content would go here */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Preferred Course Level</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="postgraduate">Postgraduate</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Preferred Field</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="Location Preferences">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Set your preferred locations for colleges and universities.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Preferred States</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred states" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Budget Range (Annual)</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">₹0 - ₹1 Lakh</SelectItem>
                        <SelectItem value="1-3">₹1 - ₹3 Lakhs</SelectItem>
                        <SelectItem value="3-5">₹3 - ₹5 Lakhs</SelectItem>
                        <SelectItem value="5+">₹5+ Lakhs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <DashboardCard title="Document Upload Status">
              <div className="space-y-4">
                {[
                  { name: "Class 10 Marksheet", status: "uploaded", required: true },
                  { name: "Class 12 Marksheet", status: "uploaded", required: true },
                  { name: "JEE Main Scorecard", status: "uploaded", required: false },
                  { name: "JEE Advanced Scorecard", status: "uploaded", required: false },
                  { name: "Passport Size Photo", status: "pending", required: true },
                  { name: "Signature", status: "pending", required: true },
                  { name: "Caste Certificate", status: "not-required", required: false },
                  { name: "Income Certificate", status: "not-required", required: false },
                ].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          doc.status === "uploaded"
                            ? "bg-green-100 text-green-600"
                            : doc.status === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.required ? "Required" : "Optional"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          doc.status === "uploaded" ? "default" : doc.status === "pending" ? "outline" : "secondary"
                        }
                      >
                        {doc.status === "uploaded" ? "Uploaded" : doc.status === "pending" ? "Pending" : "Not Required"}
                      </Badge>
                      {doc.status === "pending" && <Button size="sm">Upload</Button>}
                      {doc.status === "uploaded" && (
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
