import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MagicLinkVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    const redirectPath = searchParams.get("redirect") || "/dashboard";

    if (!token) {
      setError("Invalid or missing verification link. Please request a new access link.");
      return;
    }

    // Save token and navigate to dashboard
    localStorage.setItem("magic_link_token", token);
    
    // Slight delay to show loading state before redirect
    setTimeout(() => {
      navigate(redirectPath);
    }, 1000);
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 flex items-center justify-center bg-muted/30">
      <Card className="max-w-md w-full shadow-xl border-border/50 text-center">
        {error ? (
          <>
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl text-red-600">Verification Failed</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/login")} className="w-full h-12">
                Request New Link
              </Button>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
              <CardTitle className="text-2xl">Verifying Access...</CardTitle>
              <CardDescription>
                Please wait while we securely authenticate your session.
              </CardDescription>
            </CardHeader>
          </>
        )}
      </Card>
    </div>
  );
};

export default MagicLinkVerify;
