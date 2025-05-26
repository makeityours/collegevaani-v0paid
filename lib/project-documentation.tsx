/**
 * CollegeVaani - Project Documentation
 *
 * This file provides comprehensive documentation of the CollegeVaani project structure,
 * including all pages, components, and their interdependencies.
 */

/**
 * Project Overview
 *
 * CollegeVaani is a comprehensive platform for students to discover, compare, and apply to
 * colleges in India. The platform provides information about colleges, courses, exams,
 * and various educational resources.
 *
 * Key Features:
 * - College search and comparison
 * - Course information
 * - Exam details and calendar
 * - Online degree programs
 * - Educational resources
 * - User dashboards for different roles (students, counselors, college representatives, parents)
 * - Admin panel for content management
 */

/**
 * Project Structure
 *
 * The project follows Next.js App Router structure with the following main directories:
 *
 * /app - Contains all pages and routes
 * /components - Reusable UI components
 * /lib - Utility functions and shared code
 * /public - Static assets
 *
 * Key Files:
 * - app/layout.tsx - Root layout for the entire application
 * - app/page.tsx - Homepage
 * - components/header.tsx - Main navigation header
 * - components/footer.tsx - Site footer
 * - lib/utils.ts - Utility functions
 */

/**
 * Pages Structure
 *
 * 1. Main Pages
 *    - / (Homepage)
 *    - /colleges - College listings
 *    - /colleges/[id] - Individual college page
 *    - /colleges/compare - College comparison tool
 *    - /courses - Course listings
 *    - /courses/[slug] - Individual course page
 *    - /online-degrees - Online degree programs
 *    - /online-degrees/[category] - Category-specific online programs
 *    - /exams - Exam listings
 *    - /exams/[slug] - Individual exam page
 *    - /resources - Educational resources
 *    - /resources/college-predictor - College prediction tool
 *    - /news - Educational news
 *
 * 2. Authentication Pages
 *    - /auth/login - User login
 *    - /auth/register - User registration
 *
 * 3. Dashboard Pages
 *    - /dashboard/parent - Parent dashboard
 *    - /dashboard/counselor - Counselor dashboard
 *    - /dashboard/college-rep - College representative dashboard
 *
 * 4. Admin Pages
 *    - /admin - Admin dashboard
 *    - /admin/colleges - College management
 *    - /admin/colleges/[id]/edit - Edit college
 *    - /admin/courses - Course management
 *    - /admin/exams - Exam management
 *    - /admin/study-abroad - Study abroad program management
 *    - /admin/news - News management
 *    - /admin/online-degrees - Online degree program management
 */

/**
 * Component Structure
 *
 * 1. Layout Components
 *    - Header - Main navigation
 *    - Footer - Site footer
 *    - AdminSidebar - Sidebar for admin pages
 *    - AdminHeader - Header for admin pages
 *    - DashboardLayout - Layout for dashboard pages
 *
 * 2. UI Components
 *    - Button - Reusable button component
 *    - Input - Form input component
 *    - Card - Content card component
 *    - Avatar - User avatar component
 *    - Badge - Status badge component
 *    - DropdownMenu - Menu component
 *    - Sheet - Slide-in panel component
 *
 * 3. Feature Components
 *    - HeroSearch - Homepage hero section with search
 *    - FeaturedColleges - College showcase component
 *    - PopularCourses - Course showcase component
 *    - ExamCalendar - Upcoming exam calendar
 *    - ExamAlertDialog - Exam notification dialog
 *    - Testimonials - User testimonials
 *    - LeadGenerationForm - Form for capturing user information
 *    - UniversityCard - Card displaying university information
 *    - TestimonialCard - Card displaying user testimonials
 *    - FAQAccordion - Accordion for frequently asked questions
 *
 * 4. Dashboard Components
 *    - DashboardCard - Card for dashboard statistics
 *    - ProgressCard - Progress indicator card
 *    - NotificationItem - Notification display component
 *    - StatsCard - Statistics display card
 */

/**
 * Data Flow
 *
 * The application follows a server-first approach using Next.js App Router:
 *
 * 1. Server Components fetch data directly from APIs or databases
 * 2. Data is passed down to Client Components when interactivity is needed
 * 3. Server Actions handle form submissions and data mutations
 *
 * Key data entities:
 * - Colleges
 * - Courses
 * - Online Degree Programs
 * - Exams
 * - Users (Students, Parents, Counselors, College Representatives, Admins)
 * - Applications
 * - News
 * - Leads (from lead generation forms)
 */

/**
 * Authentication and Authorization
 *
 * The application uses a role-based access control system:
 *
 * - Public users can browse colleges, courses, and exams
 * - Authenticated students can save favorites, apply to colleges, and track applications
 * - Parents can view their children's applications and progress
 * - Counselors can manage multiple students
 * - College representatives can manage their college profiles
 * - Admins have full access to the content management system
 */

/**
 * Responsive Design
 *
 * The application is fully responsive with the following breakpoints:
 *
 * - xs: 400px (custom breakpoint)
 * - sm: 640px
 * - md: 768px
 * - lg: 1024px
 * - xl: 1280px
 * - 2xl: 1536px
 *
 * Key responsive features:
 * - Mobile-first design approach
 * - Collapsible navigation on small screens
 * - Responsive grids for listings
 * - Optimized tables for mobile viewing
 */

/**
 * Performance Optimizations
 *
 * The application implements several performance optimizations:
 *
 * - Server Components for reduced client-side JavaScript
 * - Image optimization with Next.js Image component
 * - Route prefetching for faster navigation
 * - Incremental Static Regeneration for frequently updated pages
 * - Code splitting and lazy loading
 */

/**
 * Accessibility
 *
 * The application follows WCAG 2.1 guidelines:
 *
 * - Semantic HTML structure
 * - Proper ARIA attributes
 * - Keyboard navigation support
 * - Screen reader compatibility
 * - Sufficient color contrast
 * - Focus management
 */

/**
 * Online Degrees Page
 *
 * The Online Degrees page is a dedicated section optimized for lead generation and showcasing
 * online degree programs from partner universities.
 *
 * Page Structure:
 * 1. Hero Section
 *    - Compelling headline and value proposition
 *    - Primary lead generation form
 *    - Social proof elements (student count, ratings)
 *
 * 2. Featured Universities Section
 *    - Logos of partner universities
 *    - Establishes credibility and trust
 *
 * 3. Program Categories
 *    - Tabbed interface for different program types
 *    - Program cards with key information
 *    - Clear CTAs for each program
 *
 * 4. Why Choose Online Degrees
 *    - Benefits of online education
 *    - Video testimonial/explainer
 *    - Social proof element
 *
 * 5. Online vs Traditional Comparison
 *    - Side-by-side comparison of learning modes
 *    - Highlights advantages of each approach
 *    - Secondary CTA for counseling
 *
 * 6. Partner Universities
 *    - Detailed cards for each university
 *    - Accreditation information
 *    - Program count and ratings
 *
 * 7. Student Testimonials
 *    - Success stories from graduates
 *    - Builds trust and credibility
 *
 * 8. FAQ Section
 *    - Addresses common questions
 *    - Reduces friction in the decision-making process
 *
 * 9. Final CTA Section
 *    - Strong call-to-action
 *    - Secondary lead generation form
 *
 * Lead Generation Strategy:
 * - Multiple touchpoints for lead capture throughout the page
 * - Primary form in hero section (above the fold)
 * - Secondary form in final CTA section
 * - Clear CTAs on program cards and university profiles
 * - Free counseling session offer to encourage engagement
 * - Social proof elements to build trust
 * - FAQ section to address objections
 *
 * Components Used:
 * - LeadGenerationForm - Captures user information for follow-up
 * - UniversityCard - Displays university information
 * - TestimonialCard - Shows student success stories
 * - FAQAccordion - Addresses common questions
 * - Tabs - Organizes programs by category
 * - Card - Displays program information
 *
 * Integration with Website Architecture:
 * - Added to main navigation with highlight to draw attention
 * - Cross-linked from relevant sections (courses, colleges)
 * - Consistent design language with the rest of the website
 * - Mobile-optimized for all screen sizes
 * - Accessible according to WCAG guidelines
 */

/**
 * Development Guidelines
 *
 * 1. Component Creation
 *    - Use TypeScript for type safety
 *    - Follow the single responsibility principle
 *    - Use Server Components by default, Client Components when needed
 *    - Document props and usage
 *
 * 2. Styling
 *    - Use Tailwind CSS for styling
 *    - Follow the project's color scheme and design system
 *    - Use the cn utility for conditional class names
 *
 */
