import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, 
  Zap, 
  Users, 
  Globe, 
  TrendingUp,
  ArrowRight,
  Check
} from "lucide-react";
import { Link } from "react-router-dom";
import { loadSyncoraBot } from "@/components/syncoraBot";

const UseCases = () => {
  const useCases = [
    {
      icon: Zap,
      title: "Startups Scaling HR Operations",
      description: "Growing from 10 to 100+ employees",
      challenges: [
        "Manual HR processes",
        "Lack of structured policies",
        "Time-consuming payroll",
        "No performance tracking"
      ],
      solutions: [
        "Automated onboarding workflows",
        "Digital policy management",
        "Streamlined payroll processing", 
        "Goal-based performance reviews"
      ],
      results: "50% reduction in HR admin time, 90% faster onboarding",
      company: "TechStart Inc.",
      employees: "25-150 employees",
      industry: "Technology"
    },
    {
      icon: Building2,
      title: "Enterprises Automating Payroll",
      description: "Large-scale payroll compliance and processing",
      challenges: [
        "Complex salary structures",
        "Multi-location compliance",
        "Manual error-prone calculations",
        "Time-intensive processing"
      ],
      solutions: [
        "Automated salary calculations",
        "Statutory compliance management",
        "Multi-location payroll support",
        "Real-time error detection"
      ],
      results: "99.9% payroll accuracy, 70% faster processing",
      company: "GlobalCorp Ltd.",
      employees: "1000+ employees", 
      industry: "Manufacturing"
    },
    {
      icon: Globe,
      title: "Remote Teams Tracking Attendance",
      description: "Distributed workforce management",
      challenges: [
        "No visibility into remote work",
        "Time zone coordination issues",
        "Trust and accountability gaps",
        "Manual time tracking"
      ],
      solutions: [
        "GPS-based mobile check-ins",
        "Flexible work hour tracking",
        "Real-time team visibility",
        "Automated timesheet generation"
      ],
      results: "95% attendance accuracy, improved team accountability",
      company: "RemoteFirst Agency",
      employees: "50-200 employees",
      industry: "Digital Marketing"
    },
    {
      icon: Users,
      title: "Compliance-Focused Companies",
      description: "Ensuring regulatory adherence",
      challenges: [
        "Changing labor regulations",
        "Audit preparation complexity",
        "Document management chaos",
        "Compliance risk exposure"
      ],
      solutions: [
        "Automated compliance updates",
        "Audit-ready documentation",
        "Digital document management",
        "Real-time compliance monitoring"
      ],
      results: "100% audit success rate, zero compliance violations",
      company: "FinanceSecure Bank",
      employees: "500+ employees",
      industry: "Financial Services"
    }
  ];

  const industries = [
    { name: "Technology", count: "2,500+ companies" },
    { name: "Healthcare", count: "1,200+ companies" },
    { name: "Financial Services", count: "800+ companies" },
    { name: "Manufacturing", count: "1,500+ companies" },
    { name: "Retail & E-commerce", count: "900+ companies" },
    { name: "Education", count: "600+ companies" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-40 sm:pt-44 md:pt-48 pb-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              How Organizations Use OfficeKit
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Real-world applications of OfficeKit across various industries and business sizes. 
              Discover how companies like yours achieve HR excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Link to="/contact"> */}

              {/* replace onClick={loadSyncoraBot} */}
                 <Link to="/contact"> 
                <Button className="btn-cta group h-[44px]" >
                  Schedule Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                </Link>
              {/* </Link> */}
              <Link to="/pricing">
                <Button className="btn-outline">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Success Stories Across Industries
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how different types of organizations leverage OfficeKit to solve their unique HR challenges.
            </p>
          </div>

          <div className="space-y-16">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="bg-primary/10 text-primary w-16 h-16 rounded-2xl flex items-center justify-center">
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{useCase.title}</h3>
                        <p className="text-muted-foreground">{useCase.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Challenges</h4>
                        <ul className="space-y-2">
                          {useCase.challenges.map((challenge, i) => (
                            <li key={i} className="flex items-start space-x-2 text-sm text-muted-foreground">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Solutions</h4>
                        <ul className="space-y-2">
                          {useCase.solutions.map((solution, i) => (
                            <li key={i} className="flex items-start space-x-2 text-sm text-muted-foreground">
                              <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{solution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-green-800 mb-2">Results Achieved</h4>
                      <p className="text-green-700 text-sm">{useCase.results}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{useCase.company}</span>
                      <span>{useCase.employees}</span>
                      <span>{useCase.industry}</span>
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <Card className="shadow-strong border-border">
                      <CardContent className="p-8">
                        <div className="space-y-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">
                              {index === 0 ? '50%' : index === 1 ? '99.9%' : index === 2 ? '95%' : '100%'}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {index === 0 ? 'Time Saved' : index === 1 ? 'Accuracy' : index === 2 ? 'Attendance' : 'Compliance'}
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                              <span className="text-sm font-medium">Implementation Time</span>
                              <span className="text-sm text-primary">2-4 weeks</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                              <span className="text-sm font-medium">ROI Achieved</span>
                              <span className="text-sm text-primary">300%+</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                              <span className="text-sm font-medium">User Adoption</span>
                              <span className="text-sm text-primary">95%+</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Trusted Across Industries
            </h2>
            <p className="text-xl text-muted-foreground">
              Companies from every sector rely on OfficeKit for their HR needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {industries.map((industry, index) => (
              <Card key={index} className="text-center border-border">
                <CardContent className="p-6">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{industry.name}</h3>
                  <p className="text-sm text-muted-foreground">{industry.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Join thousands of companies achieving HR excellence with OfficeKit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-white text-primary hover:bg-gray-100">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UseCases;