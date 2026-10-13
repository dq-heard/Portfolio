// EmailPreviewModal.tsx
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { EmailTemplate } from "../utils/types";
import { slugify } from "../utils/formatters";
import { heading } from "../utils/fonts";
import { FaXmark, FaDesktop, FaMobileScreen } from "react-icons/fa6";
import "./styles/email.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  folderSlug?: string;
  templates?: EmailTemplate[];
}

export const EmailPreview = ({
  isOpen,
  onClose,
  projectTitle,
  folderSlug,
  templates,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  const folderName = folderSlug || slugify(projectTitle);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  // Ensure client-side mounting for Portal hydration in Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (templates && templates.length > 0) {
      setSelectedFileName(templates[0].fileName);
    }
  }, [templates]);

  // Lock background body scroll while modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted || !templates || templates.length === 0) return null;

  const currentIframePath = `/email-templates/${folderName}/${selectedFileName}`;

  const modalJSX = (
    <div
      className="email-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="email-modal-container glass-inner-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="email-modal-header">
          <h3 className={`${heading.className} modal-title`}>
            {projectTitle} — E-mail Preview
          </h3>

          <button
            onClick={onClose}
            className="close-btn"
            aria-label="Close preview"
          >
            <FaXmark />
          </button>
        </div>

        {/* Toolbar: Template Switcher & Viewport Toggles */}
        <div className="email-modal-toolbar">
          <div className="template-tabs">
            {templates.map((tpl, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFileName(tpl.fileName)}
                className={`tab-btn ${selectedFileName === tpl.fileName ? "active" : ""}`}
              >
                {tpl.label}
              </button>
            ))}
          </div>

          <div className="viewport-toggle">
            <button
              onClick={() => setViewMode("desktop")}
              className={`toggle-btn ${viewMode === "desktop" ? "active" : ""}`}
              aria-label="Desktop view"
            >
              <FaDesktop /> <span className="btn-text">Desktop</span>
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`toggle-btn ${viewMode === "mobile" ? "active" : ""}`}
              aria-label="Mobile view"
            >
              <FaMobileScreen /> <span className="btn-text">Mobile</span>
            </button>
          </div>
        </div>

        {/* Iframe Viewport Container */}
        <div className="email-modal-body">
          <div className={`iframe-wrapper ${viewMode}`}>
            <iframe
              src={currentIframePath}
              title={`Preview of ${selectedFileName}`}
              className="preview-iframe"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Mounts directly to document.body outside of .section-card
  return createPortal(modalJSX, document.body);
};
