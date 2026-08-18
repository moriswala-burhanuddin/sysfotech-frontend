import { API_BASE } from '../../../../../config';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

// Stripe and PayPal
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Mock courses to fetch details (similar to CourseDetail)
const mockCourses = {
  "web-development-bootcamp": {
    title: "Complete Web Development Bootcamp",
    price: 99.99,
    slug: "web-development-bootcamp",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
  },
  "data-science-masterclass": {
    title: "Data Science & Machine Learning Masterclass",
    price: 129.99,
    slug: "data-science-masterclass",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
  },
  "ui-ux-design": {
    title: "UI/UX Design for Beginners",
    price: 89.99,
    slug: "ui-ux-design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600",
  }
};

// Initialize Stripe (will use env variable if provided, else fallback to mock)
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx';
const stripePromise = loadStripe(stripePublicKey);

const StripeCheckoutForm = ({ course, studentName, email, phone, onSuccess, isProcessing, setIsProcessing }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!studentName || !email) {
      toast({ title: "Missing Information", description: "Please provide your name and email.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);

    try {
      const token = localStorage.getItem("magic_link_token");
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // 1. Create PaymentIntent on the backend
      const res = await fetch(`${API_BASE}/create-payment-intent/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
          name: studentName, 
          email, 
          phone, 
          course_slug: course.slug, 
          course_title: course.title,
          coupon_code: course.appliedCoupon?.code,
          payment_plan: course.paymentPlan
        })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create payment intent");

      // 2. Confirm Payment with Stripe
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Stripe element not found");

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: studentName, email }
        }
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      // Simulate webhook for local testing since we don't have Stripe CLI running
      await fetch(`${API_BASE}/test/capture/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_id: data.paymentIntentId })
      });

      onSuccess(data.magicLinkToken);
    } catch (err: any) {
      toast({ title: "Payment Failed", description: err.message, variant: "destructive" });
      setIsProcessing(false);
    }
  };

  return (
    <form id="stripe-payment-form" onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="p-4 border rounded-md bg-background shadow-sm">
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#32325d',
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#fa755a', iconColor: '#fa755a' },
          },
        }} />
      </div>
      <Button type="submit" className="w-full text-lg h-12" disabled={!stripe || isProcessing}>
        {isProcessing ? <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" /> : `Pay £${course.finalPrice || course.price}`}
      </Button>
    </form>
  );
};

const PayPalCheckout = ({ course, studentName, email, phone, onSuccess }: any) => {
  const { toast } = useToast();

  return (
    <PayPalButtons 
      style={{ layout: "vertical" }}
      createOrder={async (data, actions) => {
         if (!studentName || !email) {
           toast({ title: "Missing Information", description: "Please provide your name and email.", variant: "destructive" });
           throw new Error("Missing info");
         }
         
         const token = localStorage.getItem("magic_link_token");
         const headers: HeadersInit = { 'Content-Type': 'application/json' };
         if (token) headers['Authorization'] = `Bearer ${token}`;
         
         const res = await fetch(`${API_BASE}/create-paypal-order/`, {
           method: 'POST',
           headers,
           body: JSON.stringify({ 
             name: studentName, 
             email, 
             phone, 
             course_slug: course.slug, 
             course_title: course.title,
             coupon_code: course.appliedCoupon?.code,
             payment_plan: course.paymentPlan
           })
         });
         const result = await res.json();
         if (!res.ok) throw new Error(result.error);
         
         return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [{ amount: { currency_code: "USD", value: (course.finalPrice || course.price).toString() } }]
         });
      }}
      onApprove={async (data, actions) => {
         if (actions.order) {
            await actions.order.capture();
            onSuccess("mock-magic-link-paypal");
         }
      }}
      onError={(err) => {
         toast({ title: "PayPal Error", description: "Something went wrong with PayPal.", variant: "destructive" });
      }}
    />
  );
};

const Checkout = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [paymentPlan, setPaymentPlan] = useState("full");
  const [isProcessing, setIsProcessing] = useState(false);
  const [course, setCourse] = useState<any>(null);
  
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount_percentage: number} | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  useEffect(() => {
    const fetchStudent = async () => {
      const token = localStorage.getItem("magic_link_token");
      if (!token) return;
      setIsLoggedIn(true);
      try {
        const res = await fetch(`${API_BASE}/student/enrollments/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.student) {
            setStudentName(data.student.name || "");
            setEmail(data.student.email || "");
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudent();
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!slug) return;
      try {
        const res = await fetch(`${API_BASE}/courses/slug/${slug}/`);
        if (res.ok) {
          const data = await res.json();
          setCourse({
            ...data,
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
            price: parseFloat(data.price || 0),
            one_time_price: parseFloat(data.one_time_price || data.price || 0),
            installment_admission_fee: parseFloat(data.installment_admission_fee || data.price || 0),
          });
          return;
        }
      } catch (err) {
        console.error("Failed to fetch course from API:", err);
      }
      
      // Fallback
      if (mockCourses[slug as keyof typeof mockCourses]) {
        const c = mockCourses[slug as keyof typeof mockCourses];
        setCourse({ ...c, one_time_price: c.price, installment_admission_fee: c.price });
      } else {
        const formatSlug = (str: string) => {
            return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        };
        setCourse({
          title: formatSlug(slug),
          price: 429.00,
          one_time_price: 351.00,
          installment_admission_fee: 195.00,
          slug: slug,
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
        });
      }
    };
    
    fetchCourse();
  }, [slug]);

  const handlePaymentSuccess = (magicLinkToken: string) => {
    setIsProcessing(false);
    toast({
      title: "Processing Payment...",
      description: "Redirecting to secure verification...",
    });
    
    // Store token as session
    localStorage.setItem("magic_link_token", magicLinkToken);
    
    navigate("/payment-success", { 
      state: { 
        studentName, 
        email, 
        course, 
        date: currentDate,
        magicLinkToken
      } 
    });
  };

  const handleApplyCoupon = async () => {
    if (!couponCodeInput) return;
    setIsApplyingCoupon(true);
    setCouponError("");
    try {
      const res = await fetch(`${API_BASE}/coupons/validate/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCodeInput })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid coupon code.");
      
      setAppliedCoupon({ code: data.code, discount_percentage: parseFloat(data.discount_percentage) });
      toast({ title: "Coupon Applied!", description: `${data.discount_percentage}% discount applied to your order.` });
      setCouponCodeInput("");
    } catch (err: any) {
      setCouponError(err.message || "Failed to validate coupon.");
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
  };

  // Calculate base price depending on the selected plan
  const getBasePrice = () => {
    if (!course) return 0;
    if (paymentPlan === 'installment' && course.installment_admission_fee) return course.installment_admission_fee;
    if (paymentPlan === 'full' && course.one_time_price) return course.one_time_price;
    return course.price;
  };
  
  const basePrice = getBasePrice();
  const discountAmount = appliedCoupon ? (basePrice * (appliedCoupon.discount_percentage / 100)) : 0;
  const finalPrice = (basePrice - discountAmount).toFixed(2);

  // Pass applied coupon to checkout components via course object
  const courseWithCoupon = course ? { ...course, appliedCoupon, finalPrice, paymentPlan } : null;

  if (!course) return null;

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold tracking-tight">Secure Checkout</h1>
          <p className="text-muted-foreground mt-2">Complete your purchase to unlock the course instantly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Student Details */}
              <Card className="shadow-lg border-border/50 mb-8">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Student Details
                  </CardTitle>
                  <CardDescription>
                    Where should we send your Magic Link for course access?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        disabled={isLoggedIn}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                      <p className="text-[0.8rem] text-muted-foreground pb-1 leading-tight">
                        We will send your course receipt and permanent course access link to this email address. Please ensure it is entered correctly.
                      </p>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoggedIn}
                        required 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+1 (555) 000-0000" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Enrollment Date</Label>
                      <Input 
                        id="date" 
                        value={currentDate}
                        disabled 
                        className="bg-muted text-muted-foreground font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                     <Label htmlFor="course">Selected Course</Label>
                     <Input 
                       id="course" 
                       value={course.title}
                       disabled 
                       className="bg-muted text-muted-foreground font-medium"
                     />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Plan Selection */}
              <Card className="shadow-lg border-border/50 mb-8">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Select Payment Plan
                  </CardTitle>
                  <CardDescription>
                    Choose how you would like to pay for {course.title}.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    defaultValue="full"
                    value={paymentPlan}
                    onValueChange={setPaymentPlan}
                    className="gap-4"
                  >
                    <div className={`relative flex items-start space-x-3 border p-4 rounded-lg cursor-pointer transition-colors ${paymentPlan === 'full' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`} onClick={() => setPaymentPlan('full')}>
                      <RadioGroupItem value="full" id="plan-full" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="plan-full" className="font-semibold cursor-pointer text-base">
                          Pay in Full
                          <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                            Save £{course.price - course.one_time_price}
                          </span>
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Make a one-time payment of <strong>£{course.one_time_price?.toFixed(2)}</strong> and save on the total course fee.
                        </p>
                      </div>
                    </div>
                    
                    <div className={`relative flex items-start space-x-3 border p-4 rounded-lg cursor-pointer transition-colors ${paymentPlan === 'installment' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`} onClick={() => setPaymentPlan('installment')}>
                      <RadioGroupItem value="installment" id="plan-installment" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="plan-installment" className="font-semibold cursor-pointer text-base">
                          Installment Plan
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pay an admission fee of <strong>£{course.installment_admission_fee?.toFixed(2)}</strong> today, followed by two monthly installments of £117. Total fee: £{course.price?.toFixed(2)}.
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    Payment Method
                  </CardTitle>
                  <CardDescription>
                    All transactions are secure and encrypted.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup
                      defaultValue="stripe"
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="gap-4 mb-6"
                    >
                      {/* Stripe Option */}
                      <div className={`relative flex items-start space-x-3 border p-4 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'stripe' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`} onClick={() => setPaymentMethod('stripe')}>
                        <RadioGroupItem value="stripe" id="stripe" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="stripe" className="font-semibold cursor-pointer">Credit or Debit Card</Label>
                          <p className="text-sm text-muted-foreground mt-1">Processed securely by Stripe</p>
                          
                          {paymentMethod === 'stripe' && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Elements stripe={stripePromise}>
                                 <StripeCheckoutForm 
                                    course={courseWithCoupon} 
                                    studentName={studentName} 
                                    email={email} 
                                    phone={phone} 
                                    onSuccess={handlePaymentSuccess}
                                    isProcessing={isProcessing}
                                    setIsProcessing={setIsProcessing}
                                 />
                              </Elements>
                            </motion.div>
                          )}
                        </div>
                      </div>


                    </RadioGroup>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t p-6 flex-col items-start gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground w-full justify-center">
                    <Lock className="h-4 w-4" />
                    <span>Payments are secure and encrypted.</span>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="sticky top-24 shadow-lg border-border/50">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-20 w-24 rounded-md overflow-hidden shrink-0">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Lifetime Access</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Original Price</span>
                      <span className={appliedCoupon ? "line-through text-muted-foreground" : ""}>£{course.price}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-sm font-medium text-green-600">
                        <span>Discount ({appliedCoupon.discount_percentage}%)</span>
                        <span>-£{discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>£{finalPrice}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <Label htmlFor="coupon" className="text-xs text-muted-foreground mb-2 block">Have a coupon code?</Label>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-green-50 text-green-700 px-3 py-2 rounded-md text-sm border border-green-200">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="font-semibold">{appliedCoupon.code}</span> applied
                        </div>
                        <button onClick={removeCoupon} className="text-green-700 hover:text-green-900 font-medium text-xs underline">Remove</button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input 
                            id="coupon" 
                            placeholder="Enter code (e.g. SUMMER10)" 
                            value={couponCodeInput}
                            onChange={(e) => setCouponCodeInput(e.target.value)}
                            className="uppercase"
                          />
                          <Button 
                            variant="secondary" 
                            onClick={handleApplyCoupon} 
                            disabled={isApplyingCoupon || !couponCodeInput}
                          >
                            {isApplyingCoupon ? "..." : "Apply"}
                          </Button>
                        </div>
                        {couponError && <p className="text-xs text-red-500">{couponError}</p>}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-4">
                    <h4 className="text-sm font-semibold">What's included:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Full lifetime access</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Access on mobile and TV</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Certificate of completion</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
