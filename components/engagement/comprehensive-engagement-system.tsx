"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import {
  MessageSquare,
  Trophy,
  Share2,
  BookOpen,
  Award,
  Bell,
  Play,
  Download,
  Heart,
  MessageCircle,
  Send,
} from "lucide-react"

interface Quiz {
  id: string
  title: string
  questions: QuizQuestion[]
  category: string
  difficulty: "easy" | "medium" | "hard"
  points: number
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  category: string
  likes: number
  replies: number
  createdAt: Date
}

interface UserProgress {
  level: number
  points: number
  badges: string[]
  completedQuizzes: string[]
  forumPosts: number
}

export default function ComprehensiveEngagementSystem() {
  const [activeTab, setActiveTab] = useState("quizzes")
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizScore, setQuizScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [userProgress, setUserProgress] = useState<UserProgress>({
    level: 5,
    points: 2450,
    badges: ["First Quiz", "Forum Contributor", "Knowledge Seeker"],
    completedQuizzes: [],
    forumPosts: 12,
  })
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([])
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "general" })
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New quiz available: Engineering Entrance Prep", type: "quiz", time: "2 hours ago" },
    { id: 2, message: "Someone replied to your forum post", type: "forum", time: "4 hours ago" },
    { id: 3, message: "You earned a new badge: Quiz Master!", type: "achievement", time: "1 day ago" },
  ])

  const sampleQuizzes: Quiz[] = [
    {
      id: "1",
      title: "Engineering Entrance Exam Prep",
      category: "Engineering",
      difficulty: "medium",
      points: 100,
      questions: [
        {
          id: "1",
          question: "Which of the following is the most popular engineering entrance exam in India?",
          options: ["JEE Main", "BITSAT", "VITEEE", "COMEDK"],
          correctAnswer: 0,
          explanation:
            "JEE Main is conducted by NTA and is the most widely accepted engineering entrance exam in India.",
        },
        {
          id: "2",
          question: "What is the full form of IIT?",
          options: [
            "Indian Institute of Technology",
            "International Institute of Technology",
            "Indian Information Technology",
            "Industrial Institute of Technology",
          ],
          correctAnswer: 0,
          explanation:
            "IIT stands for Indian Institute of Technology, which are premier engineering institutions in India.",
        },
      ],
    },
    {
      id: "2",
      title: "Medical College Admission Guide",
      category: "Medical",
      difficulty: "hard",
      points: 150,
      questions: [
        {
          id: "1",
          question: "NEET is conducted for admission to which courses?",
          options: ["MBBS only", "BDS only", "MBBS and BDS", "All medical courses"],
          correctAnswer: 3,
          explanation:
            "NEET is the single entrance exam for admission to all undergraduate medical courses including MBBS, BDS, AYUSH, etc.",
        },
      ],
    },
  ]

  const sampleForumPosts: ForumPost[] = [
    {
      id: "1",
      title: "Best Engineering Colleges in Delhi NCR",
      content:
        "Can someone help me with the list of top engineering colleges in Delhi NCR region? I am particularly interested in Computer Science.",
      author: "Rahul Kumar",
      category: "Engineering",
      likes: 15,
      replies: 8,
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      title: "NEET Preparation Strategy",
      content: "I am in 12th grade and planning to appear for NEET next year. What should be my preparation strategy?",
      author: "Priya Sharma",
      category: "Medical",
      likes: 23,
      replies: 12,
      createdAt: new Date("2024-01-14"),
    },
  ]

  useEffect(() => {
    setForumPosts(sampleForumPosts)
  }, [])

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setQuizScore(0)
    setShowResults(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const nextQuestion = () => {
    if (currentQuiz && selectedAnswer !== null) {
      if (selectedAnswer === currentQuiz.questions[currentQuestion].correctAnswer) {
        setQuizScore(quizScore + 1)
      }

      if (currentQuestion < currentQuiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResults(true)
        // Update user progress
        const newPoints = userProgress.points + (quizScore + 1) * 10
        setUserProgress({
          ...userProgress,
          points: newPoints,
          completedQuizzes: [...userProgress.completedQuizzes, currentQuiz.id],
        })
      }
    }
  }

  const submitForumPost = () => {
    if (newPost.title && newPost.content) {
      const post: ForumPost = {
        id: Date.now().toString(),
        title: newPost.title,
        content: newPost.content,
        author: "You",
        category: newPost.category,
        likes: 0,
        replies: 0,
        createdAt: new Date(),
      }
      setForumPosts([post, ...forumPosts])
      setNewPost({ title: "", content: "", category: "general" })
      toast({
        title: "Post Created!",
        description: "Your forum post has been published successfully.",
      })
    }
  }

  const likePost = (postId: string) => {
    setForumPosts(forumPosts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  return (
    <div className="space-y-8">
      {/* User Progress Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Your Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">Level {userProgress.level}</div>
              <div className="text-sm text-gray-600">Current Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{userProgress.points}</div>
              <div className="text-sm text-gray-600">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{userProgress.badges.length}</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{userProgress.completedQuizzes.length}</div>
              <div className="text-sm text-gray-600">Quizzes Completed</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Progress to Level {userProgress.level + 1}</span>
                <span className="text-sm text-gray-600">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Recent Badges</div>
              <div className="flex gap-2">
                {userProgress.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Engagement Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="quizzes" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Quizzes
          </TabsTrigger>
          <TabsTrigger value="forum" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Forum
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="live" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Live Sessions
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Quizzes Tab */}
        <TabsContent value="quizzes" className="space-y-6">
          {!currentQuiz ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleQuizzes.map((quiz) => (
                <Card key={quiz.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {quiz.title}
                      <Badge
                        variant={
                          quiz.difficulty === "easy"
                            ? "secondary"
                            : quiz.difficulty === "medium"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {quiz.difficulty}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Category: {quiz.category} • {quiz.questions.length} questions • {quiz.points} points
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => startQuiz(quiz)} className="w-full">
                      Start Quiz
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : !showResults ? (
            <Card>
              <CardHeader>
                <CardTitle>{currentQuiz.title}</CardTitle>
                <CardDescription>
                  Question {currentQuestion + 1} of {currentQuiz.questions.length}
                </CardDescription>
                <Progress value={((currentQuestion + 1) / currentQuiz.questions.length) * 100} />
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">{currentQuiz.questions[currentQuestion].question}</h3>
                <div className="space-y-2">
                  {currentQuiz.questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === index ? "default" : "outline"}
                      className="w-full text-left justify-start"
                      onClick={() => handleAnswerSelect(index)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                <Button onClick={nextQuestion} disabled={selectedAnswer === null} className="w-full">
                  {currentQuestion < currentQuiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Quiz Completed!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">
                    {quizScore}/{currentQuiz.questions.length}
                  </div>
                  <div className="text-lg">Correct Answers</div>
                  <div className="text-sm text-gray-600">You earned {quizScore * 10} points!</div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setCurrentQuiz(null)} className="flex-1">
                    Take Another Quiz
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Result
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Forum Tab */}
        <TabsContent value="forum" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="post-title">Title</Label>
                <Input
                  id="post-title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Enter your question or topic..."
                />
              </div>
              <div>
                <Label htmlFor="post-content">Content</Label>
                <Textarea
                  id="post-content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Describe your question in detail..."
                  rows={4}
                />
              </div>
              <Button onClick={submitForumPost} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Post Question
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {forumPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <CardDescription>
                        by {post.author} • {post.createdAt.toLocaleDateString()} • {post.category}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => likePost(post.id)}
                      className="flex items-center gap-1"
                    >
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {post.replies} replies
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "JEE Main Syllabus 2024", type: "PDF", size: "2.5 MB", downloads: 1250 },
              { title: "NEET Biology Notes", type: "PDF", size: "5.2 MB", downloads: 890 },
              { title: "Engineering College Rankings", type: "Excel", size: "1.8 MB", downloads: 2100 },
              { title: "Scholarship Application Guide", type: "PDF", size: "3.1 MB", downloads: 567 },
              { title: "Career Guidance Video Series", type: "Video", size: "250 MB", downloads: 445 },
              { title: "Sample Application Forms", type: "ZIP", size: "12 MB", downloads: 789 },
            ].map((resource, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium">{resource.title}</h3>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Size: {resource.size} • {resource.downloads} downloads
                  </div>
                  <Button size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Live Sessions Tab */}
        <TabsContent value="live" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "JEE Main Strategy Session",
                instructor: "Dr. Rajesh Kumar",
                time: "Today 6:00 PM",
                duration: "2 hours",
                attendees: 245,
                status: "upcoming",
              },
              {
                title: "Medical College Admission Process",
                instructor: "Dr. Priya Sharma",
                time: "Tomorrow 4:00 PM",
                duration: "1.5 hours",
                attendees: 189,
                status: "upcoming",
              },
              {
                title: "Engineering Career Opportunities",
                instructor: "Prof. Amit Singh",
                time: "Jan 20, 7:00 PM",
                duration: "2 hours",
                attendees: 156,
                status: "scheduled",
              },
            ].map((session, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {session.title}
                    <Badge variant={session.status === "upcoming" ? "default" : "secondary"}>{session.status}</Badge>
                  </CardTitle>
                  <CardDescription>by {session.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Time:</span>
                      <span>{session.time}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Duration:</span>
                      <span>{session.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Attendees:</span>
                      <span>{session.attendees} registered</span>
                    </div>
                  </div>
                  <Button className="w-full">{session.status === "upcoming" ? "Join Session" : "Register Now"}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    {notification.type === "quiz" && <BookOpen className="h-4 w-4 text-blue-600" />}
                    {notification.type === "forum" && <MessageSquare className="h-4 w-4 text-green-600" />}
                    {notification.type === "achievement" && <Trophy className="h-4 w-4 text-yellow-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
