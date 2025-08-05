import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, Mail, Share2, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentReport {
  id: string;
  name: string;
  class: string;
  term: string;
  subjects: {
    name: string;
    caScore: number;
    examScore: number;
    total: number;
    grade: string;
  }[];
  attendance: {
    daysPresent: number;
    totalDays: number;
    percentage: number;
  };
  teacherRemarks: string;
  overallGrade: string;
  position: number;
  totalStudents: number;
}

const Reports = () => {
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [teacherRemarks, setTeacherRemarks] = useState("");

  const sampleReport: StudentReport = {
    id: "1",
    name: "Alice Johnson",
    class: "Grade 5A",
    term: "First Term 2024",
    subjects: [
      { name: "Mathematics", caScore: 35, examScore: 55, total: 90, grade: "A" },
      { name: "English Language", caScore: 32, examScore: 48, total: 80, grade: "A" },
      { name: "Science", caScore: 30, examScore: 45, total: 75, grade: "B" },
      { name: "Social Studies", caScore: 33, examScore: 47, total: 80, grade: "A" },
      { name: "Physical Education", caScore: 38, examScore: 52, total: 90, grade: "A" },
    ],
    attendance: {
      daysPresent: 85,
      totalDays: 90,
      percentage: 94.4
    },
    teacherRemarks: "Alice is an exceptional student who consistently demonstrates excellent academic performance and positive behavior in class.",
    overallGrade: "A",
    position: 2,
    totalStudents: 28
  };

  const calculateOverallAverage = (subjects: any[]) => {
    const total = subjects.reduce((sum, subject) => sum + subject.total, 0);
    return Math.round(total / subjects.length);
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Student report card has been generated successfully",
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Downloaded",
      description: "Report card PDF has been downloaded to your device",
    });
  };

  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: "Report card has been sent to parent's email address",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "Report card share link has been copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Report Cards</h1>
          <p className="text-muted-foreground">Generate and share student report cards</p>
        </div>
        <Button onClick={handleGenerateReport} className="gap-2">
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Report Generation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Report Card</CardTitle>
          <CardDescription>Select student and term to generate report card</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Student</Label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alice">Alice Johnson</SelectItem>
                  <SelectItem value="bob">Bob Smith</SelectItem>
                  <SelectItem value="carol">Carol Brown</SelectItem>
                  <SelectItem value="david">David Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Term</Label>
              <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                <SelectTrigger>
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-2024">First Term 2024</SelectItem>
                  <SelectItem value="second-2024">Second Term 2024</SelectItem>
                  <SelectItem value="third-2024">Third Term 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Class</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5a">Grade 5A</SelectItem>
                  <SelectItem value="5b">Grade 5B</SelectItem>
                  <SelectItem value="4a">Grade 4A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Teacher Remarks</Label>
            <Textarea
              placeholder="Enter your remarks about the student's performance..."
              value={teacherRemarks}
              onChange={(e) => setTeacherRemarks(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      {selectedStudent && selectedTerm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Report Card Preview</CardTitle>
                <CardDescription>Preview of {sampleReport.name}'s report card</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm" onClick={handleSendEmail}>
                  <Mail className="h-4 w-4 mr-2" />
                  Email to Parent
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Student Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-lg">{sampleReport.name}</h3>
                <p className="text-muted-foreground">{sampleReport.class}</p>
                <p className="text-muted-foreground">{sampleReport.term}</p>
              </div>
              <div className="text-right">
                <div className="space-y-1">
                  <p><span className="text-muted-foreground">Position:</span> <strong>{sampleReport.position} of {sampleReport.totalStudents}</strong></p>
                  <p><span className="text-muted-foreground">Overall Grade:</span> <Badge variant="default" className="ml-2">{sampleReport.overallGrade}</Badge></p>
                  <p><span className="text-muted-foreground">Average:</span> <strong>{calculateOverallAverage(sampleReport.subjects)}%</strong></p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Subjects Performance */}
            <div>
              <h3 className="font-semibold mb-4">Academic Performance</h3>
              <div className="space-y-3">
                {sampleReport.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{subject.name}</h4>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span>CA: {subject.caScore}/40</span>
                      <span>Exam: {subject.examScore}/60</span>
                      <span className="font-medium">Total: {subject.total}/100</span>
                      <Badge variant={subject.grade === 'F' ? "destructive" : "default"}>
                        {subject.grade}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Attendance */}
            <div>
              <h3 className="font-semibold mb-4">Attendance Summary</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{sampleReport.attendance.daysPresent}</div>
                  <div className="text-sm text-muted-foreground">Days Present</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{sampleReport.attendance.totalDays}</div>
                  <div className="text-sm text-muted-foreground">Total Days</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{sampleReport.attendance.percentage}%</div>
                  <div className="text-sm text-muted-foreground">Attendance Rate</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Teacher Remarks */}
            <div>
              <h3 className="font-semibold mb-2">Teacher's Remarks</h3>
              <p className="text-muted-foreground bg-muted p-4 rounded-lg">
                {teacherRemarks || sampleReport.teacherRemarks}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Reports;