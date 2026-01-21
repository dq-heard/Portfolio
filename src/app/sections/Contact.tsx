import { Chat, Resume } from "@/app/utils/types";
import { ContactForm, ContactItem, ResumeLink } from "@/app/components";
import { useSectionReady } from "../hooks/useSectionReady";
import { useContactForm } from "../hooks/useContactForm";
import { stencil, heading } from "../utils/fonts";
import { BsChatDotsFill } from "react-icons/bs";
import "./styles/contact.css";

interface SectionProps {
  data: {
    contact: Chat;
    resume: Resume | null;
  };
  onContentLoaded: () => void;
}

function isValidContact(
  data: any
): data is { contact: Chat; resume: Resume | null } {
  return (
    data &&
    typeof data.contact?.heading1 === "string" &&
    Array.isArray(data.contact?.info)
  );
}

const Contact = ({ data, onContentLoaded }: SectionProps) => {
  useSectionReady(onContentLoaded);
  const {
    formData,
    errors,
    touchedFields,
    onChange,
    onBlur,
    handleSubmit,
    loading,
    buttonDisabled,
  } = useContactForm();

  if (!isValidContact(data)) return <div>Invalid contact data</div>;
  const { contact, resume } = data;

  return (
    <section className="section-card" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className={`${stencil.className} section-title`}>
        <BsChatDotsFill aria-hidden="true" focusable="false" /> Contact Me
      </h2>

      <div className="section-content">
        <div className="contact-wrapper">
          <div className="glass-inner-card">
            <h3 className={heading.className}>{contact.heading1}</h3>
            <div className="contact-items">
              {contact.info.map((item) => (
                <ContactItem key={item.label} {...item} />
              ))}
              {resume && <ResumeLink resume={resume} />}
            </div>
          </div>

          <ContactForm
            chat={contact}
            formData={formData}
            errors={errors}
            touchedFields={touchedFields}
            onChange={onChange}
            onBlur={onBlur}
            handleSubmit={handleSubmit}
            loading={loading}
            buttonDisabled={buttonDisabled}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
