import { heading } from "@/app/utils/fonts";
import { DynamicIcon } from "../DynamicIcon";

const ContactItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) => (
  <div className="contact-item">
    <div className="icon-box">
      <DynamicIcon name={icon} />
    </div>
    <div className="text-box">
      <h4 className={heading.className}>{label}:</h4>
      <span>{value}</span>
    </div>
  </div>
);

export default ContactItem;
