import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BookOpen, 
  ClipboardList, 
  FileText, 
  Plus,
  TrendingUp,
  Calendar,
  Award
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Students",
      value: "234",
      description: "Across all classes",
      icon: Users,
      trend: "+12 this month"
    },
    {
      title: "Active Subjects",
      value: "18",
      description: "Currently teaching",
      icon: BookOpen,
      trend: "+2 new subjects"
    },
    {
      title: "Attendance Rate",
      value: "94.2%",
      description: "This month average",
      icon: Calendar,
      trend: "+2.3% from last month"
    },
    {
      title: "Reports Generated",
      value: "45",
      description: "This semester",
      icon: FileText,
      trend: "+8 this week"
    }
  ];

  const quickActions = [
    {
      title: "Add New Student",
      description: "Register a new student to your class",
      icon: Users,
      action: () => navigate("/students"),
      color: "bg-primary"
    },
    {
      title: "Record Scores",
      description: "Input CA and exam scores",
      icon: ClipboardList,
      action: () => navigate("/scores"),
      color: "bg-accent"
    },
    {
      title: "Generate Report",
      description: "Create student report cards",
      icon: FileText,
      action: () => navigate("/reports"),
      color: "bg-warning"
    },
    {
      title: "View Analytics",
      description: "Check performance trends",
      icon: TrendingUp,
      action: () => navigate("/analytics"),
      color: "bg-primary"
    }
  ];

  const recentActivity = [
    {
      action: "Added new student",
      student: "Sarah Johnson",
      time: "2 hours ago",
      type: "student"
    },
    {
      action: "Generated report card",
      student: "Michael Brown",
      time: "5 hours ago",
      type: "report"
    },
    {
      action: "Updated Mathematics scores",
      student: "Class 5A",
      time: "1 day ago",
      type: "score"
    },
    {
      action: "Marked attendance",
      student: "Class 4B",
      time: "1 day ago",
      type: "attendance"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening in your classes.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Quick Add
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 text-accent" />
                <span className="text-xs text-accent font-medium">{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks you can perform right away
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {quickActions.map((action) => (
                  <div
                    key={action.title}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={action.action}
                  >
                    <div className={`h-10 w-10 rounded-lg ${action.color} flex items-center justify-center`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.student}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;