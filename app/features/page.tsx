import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, CheckCircle, Clock, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Features() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-12 text-center">
          TaskAI Features
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FeatureDetailCard
            icon={<Brain className="h-12 w-12" />}
            title="AI-Powered Task Management"
            description="Our advanced AI system analyzes your tasks and provides smart suggestions for breaking them down into manageable steps. Get personalized recommendations based on your team's workflow patterns and project requirements."
          />
          
          <FeatureDetailCard
            icon={<Clock className="h-12 w-12" />}
            title="Real-Time Collaboration"
            description="Experience seamless team collaboration with instant updates and notifications. Changes to tasks are reflected in real-time, ensuring everyone stays on the same page and can respond quickly to updates."
          />
          
          <FeatureDetailCard
            icon={<Users className="h-12 w-12" />}
            title="Team Management"
            description="Efficiently manage your team with role-based access control, task assignments, and progress tracking. Keep everyone accountable and ensure smooth project execution with clear responsibility allocation."
          />
          
          <FeatureDetailCard
            icon={<CheckCircle className="h-12 w-12" />}
            title="Progress Tracking"
            description="Monitor task progress with intuitive status updates and visual indicators. Get insights into project timelines, identify bottlenecks early, and ensure deadlines are met with our comprehensive tracking system."
          />
        </div>
      </div>
    </div>
  );
}

function FeatureDetailCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-8">
      <div className="mb-6 text-primary">{icon}</div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
}