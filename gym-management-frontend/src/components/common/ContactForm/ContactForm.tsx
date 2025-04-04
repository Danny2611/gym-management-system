// src/components/common/ContactForm.tsx

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button";

// Define schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

// TypeScript type derived from schema
type FormData = z.infer<typeof contactFormSchema>;

export interface ContactFormProps {
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  success?: boolean;
  error?: string;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  loading = false,
  success = false,
  error,
  className = "",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const processSubmit = (data: FormData) => {
    onSubmit(data);

    // Reset the form after successful submission
    if (success) {
      reset();
    }
  };

  return (
    <div className={`rounded-lg bg-white p-6 shadow-md ${className}`}>
      <form onSubmit={handleSubmit(processSubmit)}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Name field */}
          <div className="col-span-1">
            <label
              htmlFor="name"
              className="mb-2 block font-medium text-gray-700"
            >
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              className={`focus:ring-primary-500 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="John Doe"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email field */}
          <div className="col-span-1">
            <label
              htmlFor="email"
              className="mb-2 block font-medium text-gray-700"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className={`focus:ring-primary-500 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="johndoe@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone field (optional) */}
          <div className="col-span-1">
            <label
              htmlFor="phone"
              className="mb-2 block font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="focus:ring-primary-500 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2"
              placeholder="+1 (123) 456-7890"
              {...register("phone")}
            />
          </div>

          {/* Subject field */}
          <div className="col-span-1">
            <label
              htmlFor="subject"
              className="mb-2 block font-medium text-gray-700"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              className={`focus:ring-primary-500 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.subject ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. Membership Inquiry"
              {...register("subject")}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-500">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message field */}
          <div className="col-span-full">
            <label
              htmlFor="message"
              className="mb-2 block font-medium text-gray-700"
            >
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              className={`focus:ring-primary-500 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Please write your message here..."
              {...register("message")}
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 rounded-md bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="mt-4 rounded-md bg-green-100 p-3 text-green-700">
            Your message has been sent successfully. We'll get back to you soon!
          </div>
        )}

        {/* Submit button */}
        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            size="large"
            text={loading ? "Sending..." : "Send Message"}
            disabled={loading}
            fullWidth
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
