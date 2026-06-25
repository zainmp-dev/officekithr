import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Users, 
  MessageSquare, 
  BookOpen, 
  Calendar,
  Award,
  HelpCircle,
  ArrowRight,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const Community = () => {
  const communityStats = [
    { number: "15K+", label: "Active Members" },
    { number: "2.5K+", label: "Discussions" },
    { number: "500+", label: "Resources" },
    { number: "50+", label: "Events Hosted" }
  ];

  const forumCategories = [
    {
      icon: MessageSquare,
      title: "General Discussions",
      description: "Share ideas, ask questions, and connect with fellow HR professionals",
      posts: "1,247 posts",
      lastActivity: "2 hours ago"
    },
    {
      icon: HelpCircle,
      title: "Product Support",
      description: "Get help with OfficeKit features and troubleshoot issues",
      posts: "856 posts",
      lastActivity: "1 hour ago"
    },
    {
      icon: BookOpen,
      title: "Best Practices",
      description: "Learn and share HR best practices and implementation strategies",
      posts: "623 posts", 
      lastActivity: "30 minutes ago"
    },
    {
      icon: Award,
      title: "Success Stories",
      description: "Celebrate wins and share how OfficeKit transformed your HR processes",
      posts: "342 posts",
      lastActivity: "4 hours ago"
    }
  ];

  const upcomingEvents = [
    {
      title: "HR Tech Trends 2024",
      date: "March 28, 2024",
      time: "2:00 PM IST",
      type: "Webinar",
      attendees: "245 registered"
    },
    {
      title: "Payroll Compliance Workshop",
      date: "April 5, 2024", 
      time: "3:00 PM IST",
      type: "Workshop",
      attendees: "180 registered"
    },
    {
      title: "OfficeKit User Meetup - Mumbai",
      date: "April 12, 2024",
      time: "6:00 PM IST", 
      type: "In-Person",
      attendees: "85 registered"
    }
  ];

  const resources = [
    {
      title: "HR Policy Templates",
      description: "Ready-to-use policy templates for common HR scenarios",
      downloads: "2.3K downloads",
      type: "Templates"
    },
    {
      title: "Compliance Checklist",
      description: "Complete checklist for HR compliance across different states",
      downloads: "1.8K downloads", 
      type: "Guide"
    },
    {
      title: "Performance Review Guide",
      description: "Step-by-step guide to conducting effective performance reviews",
      downloads: "1.5K downloads",
      type: "Guide"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-40 sm:pt-44 md:pt-48 pb-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Join Our Growing HR Community
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get support, share ideas, and connect with fellow HR professionals and OfficeKit users. 
              Learn, grow, and succeed together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-cta group">
                Join Community
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button className="btn-outline">
                Browse Resources
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Forums */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Community Forums</h2>
            <p className="text-xl text-muted-foreground">
              Join discussions, share knowledge, and get help from the community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {forumCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="border-border hover:shadow-strong transition-shadow group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 text-primary w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                        <p className="text-sm text-muted-foreground">{category.posts}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last activity: {category.lastActivity}</span>
                      <Button variant="ghost" size="sm" className="group">
                        View <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events & Webinars */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Events & Webinars</h2>
            <p className="text-xl text-muted-foreground">
              Join our regular events to learn, network, and stay updated with HR trends
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.type === 'Webinar' ? 'bg-blue-100 text-blue-700' :
                      event.type === 'Workshop' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {event.type}
                    </span>
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{event.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div>{event.date} • {event.time}</div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                  <Button className="w-full btn-outline">Register Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Base */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Knowledge Base</h2>
            <p className="text-xl text-muted-foreground">
              Access free resources, templates, and guides to excel in HR management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {resources.map((resource, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <BookOpen className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                        {resource.type}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{resource.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{resource.downloads}</span>
                    <Button size="sm" className="btn-cta">Download</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="btn-outline">Browse All Resources</Button>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Community Guidelines</h2>
              <p className="text-muted-foreground">
                Help us maintain a respectful and helpful community for everyone
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Be Respectful</h3>
                    <p className="text-muted-foreground text-sm">
                      Treat all community members with respect and professionalism.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Share Knowledge</h3>
                    <p className="text-muted-foreground text-sm">
                      Help others by sharing your expertise and experiences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Stay On Topic</h3>
                    <p className="text-muted-foreground text-sm">
                      Keep discussions relevant to HR and OfficeKit-related topics.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Search First</h3>
                    <p className="text-muted-foreground text-sm">
                      Check existing discussions before posting new questions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">No Spam</h3>
                    <p className="text-muted-foreground text-sm">
                      Avoid promotional content and repetitive posts.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Report Issues</h3>
                    <p className="text-muted-foreground text-sm">
                      Report inappropriate content to help maintain quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Join the Community?</h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Connect with 15,000+ HR professionals and grow your expertise with OfficeKit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-gray-100">
                Join Community Forum
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Register for Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;