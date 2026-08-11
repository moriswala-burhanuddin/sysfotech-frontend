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
      // 1. Create PaymentIntent on the backend
      const res = await fetch('http://127.0.0.1:8000/api/create-payment-intent/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: studentName, email, phone, course_slug: course.slug, course_title: course.title })
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
      await fetch('http://127.0.0.1:8000/api/test/capture/', {
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
        {isProcessing ? <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" /> : `Pay $${course.price}`}
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
         
         const res = await fetch('http://127.0.0.1:8000/api/create-paypal-order/', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ name: studentName, email, phone, course_slug: course.slug, course_title: course.title })
         });
         const result = await res.json();
         if (!res.ok) throw new Error(result.error);
         
         return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [{ amount: { currency_code: "USD", value: course.price.toString() } }]
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [course, setCourse] = useState<any>(null);
  
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  useEffect(() => {
    if (slug && mockCourses[slug as keyof typeof mockCourses]) {
      setCourse(mockCourses[slug as keyof typeof mockCourses]);
    } else {
      const formatSlug = (str: string) => {
          if (!str) return "Selected Course";
          return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      };
      setCourse({
        title: formatSlug(slug || "selected-course"),
        price: 99.99,
        slug: slug || "selected-course",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
      });
    }
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
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                                    course={course} 
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

                      {/* PayPal Option */}
                      <div className={`relative flex items-start space-x-3 border p-4 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`} onClick={() => setPaymentMethod('paypal')}>
                        <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="paypal" className="font-semibold cursor-pointer">PayPal</Label>
                          <p className="text-sm text-muted-foreground mt-1">You will be redirected to PayPal to complete your purchase securely.</p>
                          
                          {paymentMethod === 'paypal' && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4"
                            >
                              <PayPalScriptProvider options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "test" }}>
                                <PayPalCheckout 
                                   course={course} 
                                   studentName={studentName} 
                                   email={email} 
                                   phone={phone} 
                                   onSuccess={handlePaymentSuccess}
                                />
                              </PayPalScriptProvider>
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
                      <span>${course.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-green-500">-$0.00</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${course.price}</span>
                    </div>
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
