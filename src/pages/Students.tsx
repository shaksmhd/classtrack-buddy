import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter,
  Mail,
  Phone,
  User,
  Calendar,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    dateOfBirth: "",
    address: ""
  });

  // Mock data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      class: "Class 5A",
      parentName: "Robert Johnson",
      parentEmail: "robert.j@email.com",
      parentPhone: "+1234567890",
      dateOfBirth: "2010-05-15",
      address: "123 Oak Street",
      attendance: 95,
      averageScore: 87
    },
    {
      id: 2,
      name: "Michael Brown",
      class: "Class 5A",
      parentName: "Sarah Brown",
      parentEmail: "sarah.brown@email.com",
      parentPhone: "+1234567891",
      dateOfBirth: "2010-03-22",
      address: "456 Pine Avenue",
      attendance: 92,
      averageScore: 79
    },
    {
      id: 3,
      name: "Emma Davis",
      class: "Class 4B",
      parentName: "David Davis",
      parentEmail: "david.davis@email.com",
      parentPhone: "+1234567892",
      dateOfBirth: "2011-01-10",
      address: "789 Maple Road",
      attendance: 98,
      averageScore: 92
    }
  ]);

  const classes = ["Class 4A", "Class 4B", "Class 5A", "Class 5B", "Class 6A"];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === "all" || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.class || !newStudent.parentName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const studentToAdd = {
      id: students.length + 1,
      ...newStudent,
      attendance: 100,
      averageScore: 0
    };

    setStudents([...students, studentToAdd]);
    setNewStudent({
      name: "",
      class: "",
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      dateOfBirth: "",
      address: ""
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Student added",
      description: `${newStudent.name} has been successfully added to your class.`,
    });
  };

  const getAttendanceBadge = (attendance: number) => {
    if (attendance >= 95) return <Badge className="bg-accent text-accent-foreground">Excellent</Badge>;
    if (attendance >= 85) return <Badge variant="secondary">Good</Badge>;
    return <Badge variant="destructive">Needs Attention</Badge>;
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-accent text-accent-foreground">A</Badge>;
    if (score >= 80) return <Badge variant="secondary">B</Badge>;
    if (score >= 70) return <Badge className="bg-warning text-warning-foreground">C</Badge>;
    return <Badge variant="destructive">Needs Improvement</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground">Manage your students across all classes</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Add a new student to your class. Fill in all the required information.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Student Name *</Label>
                  <Input
                    id="name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter student name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class *</Label>
                  <Select
                    value={newStudent.class}
                    onValueChange={(value) => setNewStudent(prev => ({ ...prev, class: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent Name *</Label>
                  <Input
                    id="parentName"
                    value={newStudent.parentName}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, parentName: e.target.value }))}
                    placeholder="Enter parent name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={newStudent.dateOfBirth}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentEmail">Parent Email</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    value={newStudent.parentEmail}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, parentEmail: e.target.value }))}
                    placeholder="parent@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentPhone">Parent Phone</Label>
                  <Input
                    id="parentPhone"
                    value={newStudent.parentPhone}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, parentPhone: e.target.value }))}
                    placeholder="+1234567890"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newStudent.address}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter student address"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStudent}>
                Add Student
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  <CardDescription>{student.class}</CardDescription>
                </div>
                <div className="flex gap-2">
                  {getAttendanceBadge(student.attendance)}
                  {getScoreBadge(student.averageScore)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Parent:</span>
                  <span className="font-medium">{student.parentName}</span>
                </div>
                
                {student.parentEmail && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground truncate">{student.parentEmail}</span>
                  </div>
                )}
                
                {student.parentPhone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{student.parentPhone}</span>
                  </div>
                )}

                {student.dateOfBirth && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{student.dateOfBirth}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Attendance:</span>
                    <span className="font-medium">{student.attendance}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Average Score:</span>
                    <span className="font-medium">{student.averageScore}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedClass !== "all" 
                ? "Try adjusting your search criteria." 
                : "Add your first student to get started."}
            </p>
            {!searchTerm && selectedClass === "all" && (
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Student
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Students;