import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BarChart3, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="mx-auto h-20 w-20 bg-primary rounded-full flex items-center justify-center mb-8">
            <GraduationCap className="h-10 w-10 text-primary-foreground" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground">EduTracker</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamline your classroom management with our comprehensive school management system. 
              Track students, manage scores, generate reports, and communicate with parents effortlessly.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/signup")}>
              Create Account
            </Button>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <div className="mx-auto h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Student Management</h3>
              <p className="text-sm text-muted-foreground">
                Easily add and organize students across multiple classes
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="mx-auto h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Score Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Record CA and exam scores with attendance monitoring
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="mx-auto h-12 w-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-warning" />
              </div>
              <h3 className="font-semibold text-foreground">Report Cards</h3>
              <p className="text-sm text-muted-foreground">
                Generate professional PDF report cards instantly
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="mx-auto h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Parent Communication</h3>
              <p className="text-sm text-muted-foreground">
                Send reports via email and WhatsApp seamlessly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
