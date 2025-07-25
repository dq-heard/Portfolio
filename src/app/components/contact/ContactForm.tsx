import { oswald } from "@/app/utils/fonts";
import { BsSendArrowUpFill, BsSendFill } from "react-icons/bs";

interface Props {
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  errors: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  touchedFields: {
    name: boolean;
    email: boolean;
    subject: boolean;
    message: boolean;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  buttonDisabled: boolean;
  chat: {
    heading2: string;
  };
}

const ContactForm: React.FC<Props> = ({
  formData,
  errors,
  touchedFields,
  onChange,
  onBlur,
  handleSubmit,
  loading,
  buttonDisabled,
  chat,
}) => {
  return (
    <form
      className="contact-form glass-inner-card"
      onSubmit={handleSubmit}
      noValidate
    >
      <h3 className={oswald.className}>{chat.heading2}</h3>
      <div role="group" className="form-group">
        <div className="contact-input">
          <input
            required
            id="name"
            name="name"
            type="text"
            value={formData.name}
            placeholder="Name"
            onChange={onChange}
            onBlur={onBlur}
            autoComplete="on"
            aria-invalid={!!errors.name}
            aria-describedby="name-error"
          />
          <label htmlFor="name">Name</label>

          {touchedFields.name && errors.name && (
            <span role="alert" id="name-error" className="error-tooltip">
              {errors.name}
            </span>
          )}
        </div>

        <div className="contact-input">
          <input
            required
            id="email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="E-mail Address"
            onChange={onChange}
            onBlur={onBlur}
            autoComplete="on"
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
          />
          <label htmlFor="email">E-mail Address</label>

          {touchedFields.email && errors.email && (
            <span role="alert" id="email-error" className="error-tooltip">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className="contact-input">
        <input
          required
          type="text"
          id="subject"
          name="subject"
          placeholder="Subject Line"
          value={formData.subject}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="on"
          aria-invalid={!!errors.subject}
          aria-describedby="subject-error"
        />
        <label htmlFor="subject">Subject Line</label>

        {touchedFields.subject && errors.subject && (
          <span role="alert" id="subject-error" className="error-tooltip">
            {errors.subject}
          </span>
        )}
      </div>

      <div className="contact-input">
        <textarea
          required
          id="message"
          name="message"
          value={formData.message}
          placeholder="Message me!"
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="on"
          aria-invalid={!!errors.message}
          aria-describedby="message-error"
        />
        <label htmlFor="message">Message</label>

        {touchedFields.message && errors.message && (
          <span role="alert" id="message-error" className="error-tooltip">
            {errors.message}
          </span>
        )}
      </div>

      <div className="form_btn">
        <div aria-live="polite" className="sr-only">
          {loading ? "Sending message" : "Ready to submit"}
        </div>
        <button
          type="submit"
          className="glass-button"
          disabled={buttonDisabled}
          aria-label={
            loading ? "Message sent confirmation" : "Submit contact form"
          }
          aria-describedby="status-update"
        >
          {loading ? (
            <>
              Sending...
              <BsSendArrowUpFill aria-hidden="true" focusable="false" />
            </>
          ) : (
            <>
              Send Message
              <BsSendFill aria-hidden="true" focusable="false" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
