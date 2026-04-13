import ContactImage from "@/assets/undraw/undraw_profile-data.svg";
import ContactForm from "./ContactForm";
import { authService } from "@/services/auth.service";

import type { ContactFormData } from "@/validations/contact/ContactValidation";
import type { UseFormReturn } from "react-hook-form";
import Loader from "@/components/common/Loader";

const ContactManagement = () => {
  const handleSubmit = async (data: ContactFormData, methods: UseFormReturn<ContactFormData>) => {
    try {
      await authService.submitContactInquiry({
        name: data.name,
        email: data.email,
        message: data.message,
        purpose: Number(data.purpose),
      });
      methods.reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-8">
      <div className="hidden md:flex flex-1 items-center justify-center h-full max-h-[600px]">
        <img
          className="w-full h-full object-contain"
          src={ContactImage}
          alt="Contact Illustration"
          draggable={false}
        />
      </div>

      <div className="w-full flex-1 flex justify-center items-center">
        <ContactForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ContactManagement;
