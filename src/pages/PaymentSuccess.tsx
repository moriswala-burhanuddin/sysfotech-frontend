import { API_BASE } from '../config';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2, FileText, PlayCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [status, setStatus] = useState<"pending" | "verified" | "error">("pending");
  const [courseTitle, setCourseTitle] = useState("");
  const [latestEnrollmentId, setLatestEnrollmentId] = useState<number | null>(null);

  useEffect(() => {
    // 1. Get token from state (passed by Checkout) or localStorage
    const token = location.state?.magicLinkToken || localStorage.getItem("magic_link_token");
    
    if (!token) {
      setStatus("error");
      return;
    }

    // Save token if we got it from state
    if (location.state?.magicLinkToken) {
      localStorage.setItem("magic_link_token", token);
    }

    // 2. Poll the backend to see if webhook completed and marked enrollment as PAID
    let attempts = 0;
    const maxAttempts = 10;
    
    const checkEnrollment = async () => {
      try {
        const res = await fetch(`${API_BASE}/student/enrollments/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!res.ok) throw new Error("Invalid session");
        
        const data = await res.json();
        const paidCourses = data.enrollments.filter((e: any) => e.status === 'paid');
        
        if (paidCourses.length > 0) {
          const latest = paidCourses[paidCourses.length - 1];
          setCourseTitle(latest.course.title);
          setLatestEnrollmentId(latest.id);
          setStatus("verified");
        } else {
          // If not paid yet, keep polling
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(checkEnrollment, 2000); // Try again in 2 seconds
          } else {
            // Still pending after 20 seconds
            setStatus("pending"); // Keep it pending, tell them to check email
          }
        }
      } catch (err) {
        setStatus("error");
      }
    };

    checkEnrollment();
  }, [location, navigate]);

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 flex items-center justify-center bg-muted/30">
      <Card className="max-w-md w-full shadow-xl border-border/50 text-center">
        {status === "pending" && (
          <>
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
              <CardTitle className="text-2xl">Verifying Payment...</CardTitle>
              <CardDescription>
                Please wait while we confirm your payment with the provider.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This usually takes just a few seconds. Do not close this window.
              </p>
            </CardContent>
          </>
        )}

        {status === "verified" && (
          <>
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
              <CardDescription>
                You are now officially enrolled in {courseTitle || "your course"}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-6">
                We've sent your PDF invoice and course access link to your email address.
              </p>
              
              <Button 
                onClick={() => navigate("/dashboard")} 
                className="w-full text-lg h-14 bg-orange-primary hover:bg-orange-600 text-white"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Start Course
              </Button>
              
              <Button 
                variant="outline" 
                onClick={async () => {
                  if (!latestEnrollmentId) return;
                  const token = localStorage.getItem("magic_link_token");
                  if (!token) return;
                  try {
                    const res = await fetch(`${API_BASE}/student/invoice/${latestEnrollmentId}/`, {
                      headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (!res.ok) throw new Error("Failed to download");
                    const blob = await res.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `INV-${String(latestEnrollmentId).padStart(5, '0')}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                  } catch {
                    console.error("Invoice download failed");
                  }
                }}
                className="w-full h-12"
              >
                <FileText className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
            </CardContent>
          </>
        )}

        {status === "error" && (
          <>
            <CardHeader>
              <CardTitle className="text-2xl text-red-600">Access Denied</CardTitle>
              <CardDescription>
                We could not verify a valid session or payment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/")} className="w-full">
                Return to Home
              </Button>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default PaymentSuccess;
