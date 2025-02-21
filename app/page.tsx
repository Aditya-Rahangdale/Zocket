"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { Brain, CheckCircle, Clock, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">TaskAI</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="default" 
              onClick={() => router.push("/auth/signin")}
            >
              Sign In
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            AI-Powered Task Management
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Streamline your workflow with intelligent task suggestions and real-time collaboration.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => router.push("/auth/signup")}
            >
              Get Started
              <Brain className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => router.push("/features")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features for Modern Teams
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="AI-Powered Suggestions"
              description="Get intelligent task breakdowns and recommendations based on your team's workflow."
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="Real-Time Updates"
              description="Stay in sync with your team through instant updates and notifications."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Team Collaboration"
              description="Seamlessly collaborate with team members on tasks and projects."
            />
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8" />}
              title="Task Tracking"
              description="Track task progress and completion with intuitive status updates."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}