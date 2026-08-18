import { API_BASE } from '../config';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, CreditCard, PlayCircle, LogOut, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [student, setStudent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("magic_link_token");
      
      // Allow overriding token from URL for magic link login
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get('token');
      
      const activeToken = urlToken || token;
      
      if (!activeToken) {
        navigate("/login");
        return;
      }
      
      if (urlToken) {
        localStorage.setItem("magic_link_token", urlToken);
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      try {
        const res = await fetch(`${API_BASE}/student/enrollments/`, {
          headers: { 'Authorization': `Bearer ${activeToken}` }
        });
        
        if (!res.ok) {
          localStorage.removeItem("magic_link_token");
          navigate("/login");
          return;
        }
        
        const data = await res.json();
        setEnrollments(data.enrollments || []);
        setStudent(data.student);
      } catch (err) {
        console.error("Failed to fetch dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("magic_link_token");
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-12 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-slate-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, {student?.name?.split(' ')[0]}!</h1>
            <p className="text-muted-foreground mt-1">Ready to continue your learning journey?</p>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-slate-500 hover:text-slate-900">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: Courses */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-orange-primary" />
              My Courses
            </h2>
            
            {enrollments.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  You haven't enrolled in any courses yet.
                  <div className="mt-4">
                    <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {enrollments.map((enrollment, idx) => (
                  <Card key={idx} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-48 h-32 bg-slate-100 shrink-0">
                        <img 
                          src={enrollment.course.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600"} 
                          alt={enrollment.course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{enrollment.course.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">Lifetime Access</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center text-sm text-green-600 font-medium">
                            <CheckCircle2 className="mr-1 h-4 w-4" /> Enrolled
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar: Billing & Info */}
          <div className="space-y-6">
            <Card className="shadow-sm border-slate-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-slate-500" />
                  Billing & Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {enrollments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No payment history.</p>
                ) : (
                  enrollments.map((enrollment, idx) => (
                    <div key={idx} className="space-y-3">
                      {idx > 0 && <Separator className="my-2" />}
                      <div>
                        <p className="font-medium text-sm text-slate-900 line-clamp-1">{enrollment.course.title}</p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-muted-foreground">{enrollment.date}</p>
                          <p className="font-bold text-sm">£{enrollment.amount}</p>
                        </div>

                        {/* If Installments */}
                        {enrollment.payment_plan === 'installment' ? (
                          <div className="mt-3 space-y-2">
                            <div className="flex justify-between text-xs text-slate-500 mb-2">
                              <span>Total: £{enrollment.amount}</span>
                              <span>Paid: £{enrollment.amount_paid}</span>
                              <span>Remaining: £{enrollment.amount_remaining}</span>
                            </div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Installments</p>
                            {enrollment.installments?.map((inst: any) => {
                              const dueDateStr = new Date(inst.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                              return (
                                <div key={inst.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-slate-50 border border-slate-100">
                                  <div>
                                    <span className="font-medium block">{inst.name}</span>
                                    <span className="text-xs text-slate-500">£{inst.amount} • Due: {dueDateStr}</span>
                                  </div>
                                  {inst.status === 'paid' ? (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-800">
                                      Paid
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                      Auto-pay Scheduled
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          /* Full Payment */
                          <div className="flex justify-between items-center mt-3">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              Paid ✓
                            </span>
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="h-auto p-0 text-orange-primary"
                              onClick={async () => {
                                const token = localStorage.getItem("magic_link_token");
                                if (!token || !enrollment.id) return;
                                try {
                                  const res = await fetch(`${API_BASE}/student/invoice/${enrollment.id}/`, {
                                    headers: { 'Authorization': `Bearer ${token}` }
                                  });
                                  if (!res.ok) throw new Error("Failed to download");
                                  const blob = await res.blob();
                                  const url = window.URL.createObjectURL(blob);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = `INV-${String(enrollment.id).padStart(5, '0')}.pdf`;
                                  document.body.appendChild(a);
                                  a.click();
                                  a.remove();
                                  window.URL.revokeObjectURL(url);
                                } catch {
                                  console.error("Invoice download failed");
                                }
                              }}
                            >
                              <FileText className="mr-1 h-3 w-3" /> Download receipt
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-100 bg-orange-50/50">
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-2">Need help?</h3>
                <p className="text-sm text-slate-600 mb-4">Contact our support team for any issues with your account or billing.</p>
                <Button variant="outline" className="w-full" onClick={() => navigate("/contact")}>
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
