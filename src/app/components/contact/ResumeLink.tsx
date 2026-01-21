import type { Resume } from "@/app/utils/types";
import { DynamicIcon } from "../DynamicIcon";
import { toast } from "react-toastify";
import { heading, body } from "@/app/utils/fonts";

const ResumeLink = ({ resume }: { resume: Resume }) => {
  const getFallbackResumeUrl = async (): Promise<string | null> => {
    try {
      const query = `*[_type == "resume"][0]{ file { asset->{url} } }`;
      const encodedQuery = encodeURIComponent(query);

      const response = await fetch(
        `https://630n408p.api.sanity.io/v1/data/query/production?query=${encodedQuery}`
      );

      const result = await response.json();
      return result.result?.file?.asset?.url ?? null;
    } catch (error) {
      console.error("Sanity fallback fetch failed:", error);
      return null;
    }
  };

  const openFallbackResume = async () => {
    const dynamicUrl = await getFallbackResumeUrl();
    if (dynamicUrl) {
      window.open(dynamicUrl, "_blank");
      toast.info("Fallback resume opened.");
    } else {
      console.error("No fallback URL available");
      toast.error("No fallback resume available.");
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch("/api/resume");

      if (response.status === 429) {
        const data: { fallbackUrl?: string; message?: string } =
          await response.json();
        const dynamicUrl = data.fallbackUrl ?? (await getFallbackResumeUrl());

        if (dynamicUrl) {
          await openFallbackResume();
          toast.info("You've hit a rate limit—opening fallback resume.");
        } else {
          throw new Error("No fallback URL available");
        }
        return;
      }

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `${resume.name} Resume.pdf`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
        toast.success("Resume downloaded successfully!");
      } else {
        throw new Error("Download failed");
      }
    } catch (error) {
      console.error("Resume download error:", error);
      await openFallbackResume();
      toast.error("Download failed. Attempting fallback...");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="contact-item"
      aria-label={`Download ${resume.name}'s resume`}
      title={`Download ${resume.name}'s resume`}
      style={{ cursor: "pointer" }}
    >
      <div className="icon-box resume">
        <DynamicIcon name={resume.icon} />
      </div>
      <div className="text-box">
        <h4
          className={heading.className}
          style={{ textAlign: "left", cursor: "pointer" }}
        >
          Resumé:
        </h4>
        <span className={body.className}>{resume.prompt}</span>
      </div>
    </button>
  );
};

export default ResumeLink;
