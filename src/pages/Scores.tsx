import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardList, Users, Calendar, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentScore {
  id: string;
  name: string;
  caScore: number;
  examScore: number;
  total: number;
  grade: string;
  present: boolean;
  notes: string;
}

const Scores = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  
  const [students, setStudents] = useState<StudentScore[]>([
    { id: "1", name: "Alice Johnson", caScore: 35, examScore: 55, total: 90, grade: "A", present: true, notes: "Excellent performance" },
    { id: "2", name: "Bob Smith", caScore: 28, examScore: 42, total: 70, grade: "B", present: true, notes: "Good effort" },
    { id: "3", name: "Carol Brown", caScore: 32, examScore: 48, total: 80, grade: "A", present: false, notes: "Needs to improve attendance" },
    { id: "4", name: "David Wilson", caScore: 25, examScore: 35, total: 60, grade: "C", present: true, notes: "Requires extra support" },
  ]);

  const calculateGrade = (total: number) => {
    if (total >= 90) return "A";
    if (total >= 80) return "B";
    if (total >= 70) return "C";
    if (total >= 60) return "D";
    return "F";
  };

  const updateStudentScore = (id: string, field: string, value: any) => {
    setStudents(prev => prev.map(student => {
      if (student.id === id) {
        const updated = { ...student, [field]: value };
        if (field === 'caScore' || field === 'examScore') {
          updated.total = updated.caScore + updated.examScore;
          updated.grade = calculateGrade(updated.total);
        }
        return updated;
      }
      return student;
    }));
  };

  const saveScores = () => {
    toast({
      title: "Scores saved",
      description: "All student scores have been saved successfully",
    });
  };

  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, present: true })));
    toast({
      title: "Attendance marked",
      description: "All students marked as present",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Scores & Attendance</h1>
          <p className="text-muted-foreground">Input CA scores, exam scores, and track attendance</p>
        </div>
        <Button onClick={saveScores} className="gap-2">
          <ClipboardList className="h-4 w-4" />
          Save All Scores
        </Button>
      </div>

      {/* Class and Subject Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Class & Subject</CardTitle>
          <CardDescription>Choose the class and subject to input scores for</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grade 4A">Grade 4A</SelectItem>
                  <SelectItem value="Grade 4B">Grade 4B</SelectItem>
                  <SelectItem value="Grade 5A">Grade 5A</SelectItem>
                  <SelectItem value="Grade 5B">Grade 5B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="English">English Language</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Social Studies">Social Studies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedClass && selectedSubject && (
        <Tabs defaultValue="scores" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scores">Input Scores</TabsTrigger>
            <TabsTrigger value="attendance">Mark Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="scores">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  Scores for {selectedSubject} - {selectedClass}
                </CardTitle>
                <CardDescription>
                  Enter CA scores (out of 40) and Exam scores (out of 60)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>CA Score (40)</TableHead>
                      <TableHead>Exam Score (60)</TableHead>
                      <TableHead>Total (100)</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="40"
                            value={student.caScore}
                            onChange={(e) => updateStudentScore(student.id, 'caScore', parseInt(e.target.value) || 0)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="60"
                            value={student.examScore}
                            onChange={(e) => updateStudentScore(student.id, 'examScore', parseInt(e.target.value) || 0)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Badge variant={student.total >= 70 ? "default" : "secondary"}>
                            {student.total}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={student.grade === 'F' ? "destructive" : "default"}>
                            {student.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Input
                            placeholder="Add notes..."
                            value={student.notes}
                            onChange={(e) => updateStudentScore(student.id, 'notes', e.target.value)}
                            className="w-32"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Attendance for {selectedClass}
                    </CardTitle>
                    <CardDescription>
                      Mark attendance for today's class
                    </CardDescription>
                  </div>
                  <Button onClick={markAllPresent} variant="outline">
                    Mark All Present
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={`attendance-${student.id}`}
                          checked={student.present}
                          onCheckedChange={(checked) => updateStudentScore(student.id, 'present', checked)}
                        />
                        <Label htmlFor={`attendance-${student.id}`} className="font-medium">
                          {student.name}
                        </Label>
                      </div>
                      <Badge variant={student.present ? "default" : "destructive"}>
                        {student.present ? "Present" : "Absent"}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Attendance Summary</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Students:</span>
                      <span className="ml-2 font-medium">{students.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Present:</span>
                      <span className="ml-2 font-medium text-green-600">
                        {students.filter(s => s.present).length}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Absent:</span>
                      <span className="ml-2 font-medium text-red-600">
                        {students.filter(s => !s.present).length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Scores;