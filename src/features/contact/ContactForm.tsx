import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormInput, FormSelect, FormTextarea } from "@/components/common/forms";
import IconButton from "@/components/ui/IconButton";
import { ChartNoAxesGantt, Mail, MessageCircle, SendHorizontal, UserRound } from "lucide-react";
import { CONTACT_OPTIONS } from "@/constant";
import { contactSchema, type ContactFormData } from "@/validations/contact/ContactValidation";

export interface ContactFormProps {
  onSubmit: (data: ContactFormData, methods: UseFormReturn<ContactFormData>) => Promise<void>;
}

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const { formState: { isSubmitting } } = methods;

  return (
    <div className="w-full max-w-lg bg-white/60 border border-slate-200/60 p-6 lg:p-10 rounded-2xl shadow-premium glass relative overflow-hidden group">
      <Form
        schema={contactSchema}
        methods={methods}
        onSubmit={onSubmit}
        className="flex flex-col gap-6"
      >
        <>
          <FormInput
            name="name"
            icon={UserRound}
            placeholder="Name"
            label="Name"
            labelClassName="tracking-widest"
            required
          />

          <FormInput
            name="email"
            icon={Mail}
            type="email"
            placeholder="Email"
            label="Email"
            labelClassName="tracking-widest"
            required
          />

          <FormSelect
            name="purpose"
            options={CONTACT_OPTIONS}
            icon={ChartNoAxesGantt}
            label="Purpose"
            placeholder="Select your purpose"
            labelClassName="tracking-widest"
            required
          />

          <FormTextarea
            name="message"
            icon={MessageCircle}
            label="Message"
            labelClassName="tracking-widest"
            placeholder="How can we help?"
            required
          />

          <IconButton
            icon={SendHorizontal}
            iconPosition="right"
            type="submit"
            isLoading={isSubmitting}
            className="h-14 rounded-2xl shadow-glow-primary bg-primary-500 hover:bg-primary-600 transition-all active:scale-95 border-none mt-2"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </IconButton>
        </>
      </Form>
    </div>
  );
};

export default ContactForm;
