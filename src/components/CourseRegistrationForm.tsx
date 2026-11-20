import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2, ChevronDown, CheckCircle, Users, GraduationCap, Briefcase, Sparkles, MessageSquare } from "lucide-react";
import { allCourseOptions } from "@/data/courses";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE } from "@/config";

// ---------- Form Section Accordion ----------
interface FormSectionProps {
  title: string;
  step: number;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isCompleted?: boolean;
}

const FormSection = ({
  title,
  step,
  icon,
  isOpen,
  onToggle,
  children,
  isCompleted,
}: FormSectionProps) => (
  <div className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-orange-primary/30">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${
            isCompleted
              ? "bg-green-100 text-green-600"
              : isOpen
              ? "bg-orange-primary text-white"
              : "bg-orange-primary/10 text-orange-primary"
          }`}
        >
          {isCompleted ? <CheckCircle className="w-5 h-5 text-green-600" /> : step}
        </div>
        <div className="flex items-center gap-2">
          {icon}
          <div className="font-semibold text-slate-800 text-left">{title}</div>
        </div>
      </div>
      <ChevronDown
        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="p-6 pt-2 bg-white border-t border-slate-100">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ---------- Checkbox Group ----------
interface CheckboxOption {
  label: string;
  value: string;
}

const CheckboxGroup = ({
  options,
  selected,
  onChange,
  columns = 2,
}: {
  options: CheckboxOption[];
  selected: string[];
  onChange: (values: string[]) => void;
  columns?: number;
}) => (
  <div
    className={`grid gap-3 ${
      columns === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : columns === 4
        ? "grid-cols-2 sm:grid-cols-4"
        : columns === 1
        ? "grid-cols-1"
        : "grid-cols-1 sm:grid-cols-2"
    }`}
  >
    {options.map((opt) => {
      const isChecked = selected.includes(opt.value);
      return (
        <div
          key={opt.value}
          onClick={() => {
            const updated = isChecked
              ? selected.filter((v) => v !== opt.value)
              : [...selected, opt.value];
            onChange(updated);
          }}
          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
            isChecked
              ? "border-orange-primary bg-orange-primary/5 shadow-sm"
              : "border-slate-200 hover:border-orange-primary/30 hover:bg-slate-50/50"
          }`}
        >
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all ${
              isChecked
                ? "border-orange-primary bg-orange-primary text-white"
                : "border-slate-300 bg-white"
            }`}
          >
            {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
          </div>
          <div className="text-sm text-slate-700 select-none">{opt.label}</div>
        </div>
      );
    })}
  </div>
);

// ---------- Radio Group ----------
const RadioGroup = ({
  name,
  options,
  selected,
  onChange,
  columns = 2,
}: {
  name: string;
  options: CheckboxOption[];
  selected: string;
  onChange: (value: string) => void;
  columns?: number;
}) => (
  <div
    className={`grid gap-3 ${
      columns === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : columns === 4
        ? "grid-cols-2 sm:grid-cols-4"
        : columns === 1
        ? "grid-cols-1"
        : "grid-cols-1 sm:grid-cols-2"
    }`}
  >
    {options.map((opt) => {
      const isSelected = selected === opt.value;
      return (
        <div
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
            isSelected
              ? "border-orange-primary bg-orange-primary/5 shadow-sm"
              : "border-slate-200 hover:border-orange-primary/30 hover:bg-slate-50/50"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
              isSelected
                ? "border-orange-primary"
                : "border-slate-300"
            }`}
          >
            {isSelected && (
              <div className="w-2.5 h-2.5 rounded-full bg-orange-primary" />
            )}
          </div>
          <div
            className={`text-sm select-none ${
              isSelected ? "text-slate-800 font-medium" : "text-slate-600"
            }`}
          >
            {opt.label}
          </div>
        </div>
      );
    })}
  </div>
);

interface CourseRegistrationFormProps {
  preSelectedCourse?: string;
  onSuccess?: () => void;
}

export const CourseRegistrationForm = ({ preSelectedCourse, onSuccess }: CourseRegistrationFormProps) => {
  const { toast } = useToast();
  const [openSection, setOpenSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    country: "",
    city: "",
    qualification: "",
    age: "",
    employmentStatus: "",
    whyWantCourse: "",
    selectedCourses: preSelectedCourse ? [preSelectedCourse] : ([] as string[]),
    wantDemo: "",
    demoDate: "",
    consent: false,
  });

  useEffect(() => {
    if (preSelectedCourse) {
      setFormData((prev) => ({
        ...prev,
        selectedCourses: [preSelectedCourse],
      }));
    }
  }, [preSelectedCourse]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: string, values: string[]) => {
    setFormData((prev) => ({ ...prev, [field]: values }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.whatsapp.trim()) {
      toast({
        title: "Required Fields Missing",
        description: "Please enter your Full Name, Email and WhatsApp number to continue.",
        variant: "destructive",
      });
      setOpenSection(0);
      return;
    }

    if (formData.selectedCourses.length === 0) {
      toast({
        title: "Course Selection Required",
        description: "Please select at least one course.",
        variant: "destructive",
      });
      setOpenSection(2);
      return;
    }

    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to receive course information before submitting.",
        variant: "destructive",
      });
      setOpenSection(4);
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Submit to Sysfotech Backend API (saves to DB and notifies owner via email)
      const response = await fetch(`${API_BASE}/course-registrations/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          whatsapp: formData.whatsapp,
          country: formData.country,
          city: formData.city,
          qualification: formData.qualification,
          age: formData.age,
          employmentStatus: formData.employmentStatus,
          whyWantCourse: formData.whyWantCourse,
          selectedCourses: formData.selectedCourses,
          wantDemo: formData.wantDemo,
          demoDate: formData.demoDate,
          consent: formData.consent,
        }),
      });

      // 2. Also send backup to Formspree
      try {
        fetch("https://formspree.io/f/meeydkgo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            "Full Name": formData.fullName,
            "Email": formData.email,
            "WhatsApp number with country code": formData.whatsapp,
            "Country of residence": formData.country,
            "City": formData.city,
            "Qualification": formData.qualification,
            "Age": formData.age,
            "Are you working or studying?": formData.employmentStatus,
            "Why you want this course": formData.whyWantCourse,
            "Selected Courses": formData.selectedCourses.join(", "),
            "Wants Free Demo": formData.wantDemo,
            "Demo Date": formData.demoDate,
            "Consent Given": formData.consent ? "Yes" : "No",
          }),
        }).catch(() => {});
      } catch {}

      if (response.ok) {
        toast({
          title: "Registration Received",
          description: "Your application and questionnaire have been submitted. Our admissions team has been notified and a confirmation email was sent to you.",
        });

        setFormData({
          fullName: "",
          email: "",
          whatsapp: "",
          country: "",
          city: "",
          qualification: "",
          age: "",
          employmentStatus: "",
          whyWantCourse: "",
          selectedCourses: preSelectedCourse ? [preSelectedCourse] : [],
          wantDemo: "",
          demoDate: "",
          consent: false,
        });
        setOpenSection(0);
        
        if (onSuccess) {
          onSuccess();
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast({
          title: "Submission Error",
          description: errorData.error || errorData.message || "There was a problem submitting your form. Please check your inputs.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to submit the form. Please check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto" id="enrolment-form">
      {/* Step 1: Personal & Contact Information */}
      <FormSection
        title="Personal & Contact Information"
        step={1}
        icon={<Users className="w-4 h-4 text-slate-500" />}
        isOpen={openSection === 0}
        onToggle={() => setOpenSection(openSection === 0 ? -1 : 0)}
        isCompleted={!!(formData.fullName && formData.email && formData.whatsapp)}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Full Name *
            </label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="e.g. John Doe"
              className="h-12 rounded-lg border-slate-200 focus:border-orange-primary focus:ring-orange-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address *
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className="h-12 rounded-lg border-slate-200 focus:border-orange-primary focus:ring-orange-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              WhatsApp number with country code *
            </label>
            <Input
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              placeholder="+44 7123 456789"
              className="h-12 rounded-lg border-slate-200 focus:border-orange-primary focus:ring-orange-primary/20"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Country of residence
              </label>
              <Input
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="e.g. United Kingdom"
                className="h-12 rounded-lg border-slate-200 focus:border-orange-primary focus:ring-orange-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                City
              </label>
              <Input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="e.g. London"
                className="h-12 rounded-lg border-slate-200 focus:border-orange-primary focus:ring-orange-primary/20"
              />
            </div>
          </div>
        </div>
      </FormSection>

      {/* Step 2: Academic & Employment Background */}
      <FormSection
        title="Background & Profile"
        step={2}
        icon={<GraduationCap className="w-4 h-4 text-slate-500" />}
        isOpen={openSection === 1}
        onToggle={() => setOpenSection(openSection === 1 ? -1 : 1)}
        isCompleted={!!(formData.qualification || formData.employmentStatus)}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Qualification
              </label>
              <Input
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                placeholder="e.g. Bachelor's / High School / Diploma"
                className="h-12 rounded-lg border-slate-200 focus:border-orange-primary focus:ring-orange-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Age
              </label>
              <Input
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="e.g. 24"
                className="h-12 rounded-lg border-slate-200 focus:border-orange-primary focus:ring-orange-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2.5">
              Are you working or studying?
            </label>
            <RadioGroup
              name="employmentStatus"
              options={[
                { label: "Student", value: "Student" },
                { label: "Employed", value: "Employed" },
                { label: "Self-employed", value: "Self-employed" },
                { label: "Unemployed", value: "Unemployed" },
              ]}
              selected={formData.employmentStatus}
              onChange={(val) => setFormData((prev) => ({ ...prev, employmentStatus: val }))}
              columns={2}
            />
          </div>
        </div>
      </FormSection>

      {/* Step 3: Course Selection & Motivation */}
      <FormSection
        title="Course & Motivation"
        step={3}
        icon={<Briefcase className="w-4 h-4 text-slate-500" />}
        isOpen={openSection === 2}
        onToggle={() => setOpenSection(openSection === 2 ? -1 : 2)}
        isCompleted={formData.selectedCourses.length > 0}
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Select Your Course of Choice *
            </label>
            <CheckboxGroup
              options={allCourseOptions.map((c) => ({ label: c, value: c }))}
              selected={formData.selectedCourses}
              onChange={(vals) => handleCheckboxChange("selectedCourses", vals)}
              columns={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Why you want this course
            </label>
            <Textarea
              name="whyWantCourse"
              value={formData.whyWantCourse}
              onChange={handleInputChange}
              rows={4}
              placeholder="Tell us what you hope to achieve from this course, your career goals, or any specific skills you wish to learn..."
              className="rounded-lg border-slate-200 focus:border-orange-primary focus:ring-orange-primary/20 text-sm leading-relaxed"
            />
          </div>
        </div>
      </FormSection>

      {/* Step 4: Demo Session */}
      <FormSection
        title="1-Day Free Demo Session"
        step={4}
        icon={<Sparkles className="w-4 h-4 text-slate-500" />}
        isOpen={openSection === 3}
        onToggle={() => setOpenSection(openSection === 3 ? -1 : 3)}
        isCompleted={!!formData.wantDemo}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Would you like to register for our free 1-day demo session?
            </label>
            <RadioGroup
              name="wantDemo"
              options={[
                { label: "Yes, register me", value: "Yes" },
                { label: "No, proceed with direct admission", value: "No" },
              ]}
              selected={formData.wantDemo}
              onChange={(val) => setFormData((prev) => ({ ...prev, wantDemo: val }))}
            />
          </div>

          {formData.wantDemo === "Yes" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-4 border-t border-slate-100"
            >
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Select Demo Date
              </label>
              <Input
                type="date"
                name="demoDate"
                value={formData.demoDate}
                onChange={handleInputChange}
                className="h-12 rounded-lg border-slate-200 focus:border-orange-primary focus:ring-orange-primary/20"
              />
            </motion.div>
          )}
        </div>
      </FormSection>

      {/* Step 5: Consent & Send */}
      <FormSection
        title="Consent & Submit"
        step={5}
        icon={<Send className="w-4 h-4 text-slate-500" />}
        isOpen={openSection === 4}
        onToggle={() => setOpenSection(openSection === 4 ? -1 : 4)}
        isCompleted={formData.consent}
      >
        <div className="space-y-6">
          <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 cursor-pointer hover:border-orange-primary/30 transition-colors">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  consent: e.target.checked,
                }))
              }
              className="mt-0.5 w-5 h-5 rounded border-slate-300 text-orange-primary focus:ring-orange-primary/20"
            />
            <div className="text-sm text-slate-600 leading-relaxed text-left">
              I agree to receive course syllabus details, class schedule updates, and admission notices from Sysfotech UK Ltd.
            </div>
          </label>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-orange-primary hover:bg-orange-dark text-white text-lg font-bold rounded-xl shadow-lg transition-all"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-3 justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting Application...
              </div>
            ) : (
              <div className="flex items-center gap-2 justify-center">
                <Send className="w-5 h-5" />
                Submit Enrolment Request
              </div>
            )}
          </Button>
        </div>
      </FormSection>
    </form>
  );
};

export const CourseRegistrationModal = ({ preSelectedCourse, trigger }: { preSelectedCourse?: string, trigger?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" className="bg-orange-primary hover:bg-orange-dark text-white font-bold h-12 px-8 rounded-full shadow-lg">
            Enrol Now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-50 p-0 border-0">
        <DialogHeader className="p-6 pb-2 sticky top-0 bg-slate-50/90 backdrop-blur-md z-10 border-b border-slate-200">
          <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-primary" />
            Course Registration
          </DialogTitle>
          <DialogDescription>
            Complete the form below to submit your application.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-4">
          <CourseRegistrationForm preSelectedCourse={preSelectedCourse} onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
