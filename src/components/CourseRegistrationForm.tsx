import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2, ChevronDown, CheckCircle, Users, GraduationCap, Briefcase, Compass, Sparkles } from "lucide-react";
import { allCourseOptions } from "@/data/courses";
import { motion, AnimatePresence } from "framer-motion";

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
    mobile: "",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (field: string, values: string[]) => {
    setFormData((prev) => ({ ...prev, [field]: values }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.mobile) {
      toast({
        title: "Required Fields Missing",
        description: "Please enter your Full Name, Email and Mobile Number to continue.",
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
      setOpenSection(1);
      return;
    }

    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to receive course information before submitting.",
        variant: "destructive",
      });
      setOpenSection(3);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/meeydkgo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "Full Name": formData.fullName,
          "Email": formData.email,
          "Mobile (WhatsApp)": formData.mobile,
          "Selected Courses": formData.selectedCourses.join(", "),
          "Wants Free Demo": formData.wantDemo,
          "Demo Date": formData.demoDate,
          "Consent Given": formData.consent ? "Yes" : "No",
        }),
      });

      if (response.ok) {
        toast({
          title: "Enrolment Application Received",
          description: "Your training application has been submitted successfully. We will be in touch shortly!",
        });

        setFormData({
          fullName: "",
          email: "",
          mobile: "",
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
        toast({
          title: "Submission Error",
          description: "There was a problem submitting your form. Please try again.",
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
      {/* Step 1: Personal Information */}
      <FormSection
        title="Personal Information"
        step={1}
        icon={<Users className="w-4 h-4 text-slate-500" />}
        isOpen={openSection === 0}
        onToggle={() => setOpenSection(openSection === 0 ? -1 : 0)}
        isCompleted={!!(formData.fullName && formData.email && formData.mobile)}
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
              placeholder="First and last name"
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
              Mobile Number (WhatsApp) *
            </label>
            <Input
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="+44 ..."
              className="h-12 rounded-lg border-slate-200 focus:border-orange-primary focus:ring-orange-primary/20"
            />
          </div>
        </div>
      </FormSection>

      {/* Step 2: Course Selection */}
      <FormSection
        title="Course Selection"
        step={2}
        icon={<Briefcase className="w-4 h-4 text-slate-500" />}
        isOpen={openSection === 1}
        onToggle={() => setOpenSection(openSection === 1 ? -1 : 1)}
        isCompleted={formData.selectedCourses.length > 0}
      >
        <div className="space-y-4">
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
        </div>
      </FormSection>

      {/* Step 3: Demo Session */}
      <FormSection
        title="1-Day Free Demo Session"
        step={3}
        icon={<Sparkles className="w-4 h-4 text-slate-500" />}
        isOpen={openSection === 2}
        onToggle={() => setOpenSection(openSection === 2 ? -1 : 2)}
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

      {/* Step 4: Consent & Send */}
      <FormSection
        title="Consent & Submit"
        step={4}
        icon={<Send className="w-4 h-4 text-slate-500" />}
        isOpen={openSection === 3}
        onToggle={() => setOpenSection(openSection === 3 ? -1 : 3)}
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
