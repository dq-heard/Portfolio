import { useState } from "react";
import { toast } from "react-toastify";
import { isEmailInvalid } from "../utils/validation";

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live validation
    if (touchedFields[name as keyof typeof touchedFields]) {
      validateField(name, value);
    }
  };

  const handleBlurInput = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let errorMsg = "";

    if (!value.trim()) {
      errorMsg = "This field is required.";
    } else if (name === "email" && isEmailInvalid(value)) {
      errorMsg = "Invalid email address.";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const isFormValid = (): boolean => {
    const newErrors = {
      name: formData.name.trim() ? "" : "This field is required.",
      email: isEmailInvalid(formData.email) ? "Invalid email address." : "",
      subject: formData.subject.trim() ? "" : "This field is required.",
      message: formData.message.trim() ? "" : "This field is required.",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((msg) => msg === "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonDisabled(true);
    setLoading(true);

    if (!isFormValid()) {
      toast.error("Please fix the errors before submitting.");
      setButtonDisabled(false);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _type: "inbox",
          ...formData,
        }),
      });

      const response = await res.json();

      if (res.ok && response.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTouchedFields({
          name: false,
          email: false,
          subject: false,
          message: false,
        });
        setErrors({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Message failed to send. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setButtonDisabled(false);
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    touchedFields,
    onChange: handleChangeInput,
    onBlur: handleBlurInput,
    handleSubmit,
    loading,
    buttonDisabled,
  };
};
