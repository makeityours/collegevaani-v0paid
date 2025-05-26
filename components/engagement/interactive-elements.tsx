"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Star, Award, Zap, MessageCircle, ThumbsUp, Share2, CheckCircle, Users } from "lucide-react"

// Interactive Quiz Component
export function InteractiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const quiz = {
    title: "Find Your Perfect Engineering Branch",
    description: "Answer these questions to discover which engineering field suits you best",
    questions: [
      {
        question: "What interests you most?",
        options: [
          "Building software and apps",
          "Designing machines and systems",
          "Working with electronics and circuits",
          "Solving mathematical problems",
        ],
        weights: { cse: [3, 1, 2, 2], mech: [1, 3, 1, 2], ece: [2, 1, 3, 2], civil: [1, 2, 1, 3] },
      },
      {
        question: "Which work environment appeals to you?",
        options: [
          "Office with computers",
          "Factory or manufacturing unit",
          "Laboratory with equipment",
          "Construction sites",
        ],
        weights: { cse: [3, 1, 2, 1], mech: [1, 3, 2, 2], ece: [2, 1, 3, 1], civil: [1, 2, 1, 3] },
      },
      {
        question: "What's your preferred problem-solving approach?",
        options: [
          "Logical and algorithmic",
          "Hands-on and practical",
          "Analytical and precise",
          "Creative and innovative",
        ],
        weights: { cse: [3, 1, 2, 2], mech: [1, 3, 1, 2], ece: [2, 1, 3, 1], civil: [2, 2, 1, 3] },
      },
    ],
  }

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults(newAnswers)
    }
  }

  const calculateResults = (userAnswers: string[]) => {
    const scores = { cse: 0, mech: 0, ece: 0, civil: 0 }

    userAnswers.forEach((answer, qIndex) => {
      const answerIndex = quiz.questions[qIndex].options.indexOf(answer)
      const weights = quiz.questions[qIndex].weights

      Object.keys(weights).forEach((branch) => {
        scores[branch] += weights[branch][answerIndex]
      })
    })

    const maxScore = Math.max(...Object.values(scores))
    setScore(maxScore)
    setShowResults(true)
  }

  const getRecommendation = () => {
    // Logic to determine best branch based on answers
    return {
      branch: "Computer Science Engineering",
      match: "92%",
      description: "Based on your answers, you show strong aptitude for logical thinking and software development.",
      careers: ["Software Engineer", "Data Scientist", "Product Manager", "AI/ML Engineer"],
      colleges: ["IIT Delhi", "IIT Bombay", "BITS Pilani", "VIT Vellore"],
    }
  }

  if (showResults) {
    const recommendation = getRecommendation()
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <Trophy className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle>Your Perfect Match!</CardTitle>
          <CardDescription>Based on your quiz responses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600">{recommendation.branch}</h3>
            <Badge className="mt-2 bg-green-500">{recommendation.match} Match</Badge>
          </div>

          <p className="text-center text-muted-foreground">{recommendation.description}</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Career Opportunities</h4>
              <ul className="space-y-1">
                {recommendation.careers.map((career, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {career}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Top Colleges</h4>
              <ul className="space-y-1">
                {recommendation.colleges.map((college, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    {college}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">Explore Colleges</Button>
            <Button variant="outline" className="flex-1">
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{quiz.title}</CardTitle>
            <CardDescription>{quiz.description}</CardDescription>
          </div>
          <Badge variant="outline">
            {currentQuestion + 1} of {quiz.questions.length}
          </Badge>
        </div>
        <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} className="mt-4" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <h3 className="text-lg font-medium">{quiz.questions[currentQuestion].question}</h3>

          <RadioGroup onValueChange={handleAnswer}>
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}

// Gamification System
export function GamificationSystem() {
  const [userStats, setUserStats] = useState({
    level: 5,
    xp: 2450,
    xpToNext: 550,
    badges: [
      { id: "first-quiz", name: "Quiz Master", description: "Completed first quiz", icon: "🎯", earned: true },
      {
        id: "college-explorer",
        name: "College Explorer",
        description: "Viewed 10+ colleges",
        icon: "🏫",
        earned: true,
      },
      {
        id: "course-researcher",
        name: "Course Researcher",
        description: "Compared 5+ courses",
        icon: "📚",
        earned: false,
      },
      {
        id: "application-starter",
        name: "Application Starter",
        description: "Started first application",
        icon: "📝",
        earned: false,
      },
    ],
    achievements: [
      { title: "Profile Completed", points: 100, date: "2 days ago" },
      { title: "Quiz Completed", points: 50, date: "1 day ago" },
      { title: "College Bookmarked", points: 25, date: "Today" },
    ],
    streak: 7,
    totalPoints: 2450,
  })

  const [leaderboard] = useState([
    { rank: 1, name: "Aryan Kumar", points: 3250, avatar: "AK" },
    { rank: 2, name: "Priya Sharma", points: 2890, avatar: "PS" },
    { rank: 3, name: "Rohit Patel", points: 2650, avatar: "RP" },
    { rank: 4, name: "You", points: 2450, avatar: "YU", isCurrentUser: true },
    { rank: 5, name: "Sneha Gupta", points: 2320, avatar: "SG" },
  ])

  return (
    <div className="space-y-6">
      {/* User Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Level {userStats.level}</h3>
                <p className="text-muted-foreground">{userStats.xp} XP</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Next Level</div>
                <div className="text-lg font-medium">{userStats.xpToNext} XP to go</div>
              </div>
            </div>
            <Progress value={(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100} />

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-500">{userStats.streak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">{userStats.totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">
                  {userStats.badges.filter((b) => b.earned).length}
                </div>
                <div className="text-sm text-muted-foreground">Badges Earned</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-500" />
            Badges & Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userStats.badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 border rounded-lg text-center ${
                  badge.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h4 className="font-medium text-sm">{badge.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                {badge.earned && <CheckCircle className="h-4 w-4 text-green-500 mx-auto mt-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userStats.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.date}</p>
                </div>
                <Badge className="bg-green-500">+{achievement.points} XP</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-3 p-3 border rounded-lg ${
                  user.isCurrentUser ? "bg-blue-50 border-blue-200" : ""
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {user.rank}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium">{user.name}</h4>
                  <p className="text-sm text-muted-foreground">{user.points} points</p>
                </div>
                {user.isCurrentUser && <Badge>You</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Community Forum Component
export function CommunityForum() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "How to prepare for JEE Advanced after JEE Main?",
      author: "Aryan Kumar",
      authorAvatar: "AK",
      content: "I scored 96.8 percentile in JEE Main. What should be my strategy for JEE Advanced preparation?",
      timestamp: "2 hours ago",
      likes: 15,
      replies: 8,
      tags: ["JEE", "Preparation", "Strategy"],
      category: "Exam Preparation",
    },
    {
      id: 2,
      title: "IIT Delhi vs IIT Bombay for Computer Science",
      author: "Priya Sharma",
      authorAvatar: "PS",
      content: "I'm confused between IIT Delhi and IIT Bombay for CSE. Can someone help me understand the differences?",
      timestamp: "5 hours ago",
      likes: 23,
      replies: 12,
      tags: ["IIT", "Computer Science", "College Comparison"],
      category: "College Selection",
    },
    {
      id: 3,
      title: "NEET 2024 Preparation Timeline",
      author: "Dr. Rajesh Kumar",
      authorAvatar: "RK",
      content: "Here's a comprehensive 12-month preparation timeline for NEET 2024 aspirants...",
      timestamp: "1 day ago",
      likes: 45,
      replies: 20,
      tags: ["NEET", "Timeline", "Medical"],
      category: "Study Plans",
      isPinned: true,
      isExpert: true,
    },
  ])

  const [newPost, setNewPost] = useState({ title: "", content: "", category: "", tags: "" })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            Community Forum
          </CardTitle>
          <CardDescription>Connect with fellow students and get expert advice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button className="w-full">Start New Discussion</Button>

            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline">All Posts</Badge>
              <Badge variant="outline">Exam Preparation</Badge>
              <Badge variant="outline">College Selection</Badge>
              <Badge variant="outline">Study Plans</Badge>
              <Badge variant="outline">Career Guidance</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className={post.isPinned ? "border-yellow-200 bg-yellow-50" : ""}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{post.authorAvatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{post.author}</h4>
                        {post.isExpert && <Badge className="bg-blue-500 text-xs">Expert</Badge>}
                        {post.isPinned && <Badge className="bg-yellow-500 text-xs">Pinned</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{post.category}</Badge>
                </div>

                <div>
                  <h3 className="font-medium mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.content}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="h-8">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.replies}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
