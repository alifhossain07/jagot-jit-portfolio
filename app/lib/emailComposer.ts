type EmailComposeOptions = {
  to: string;
  subject: string;
};

const isMobileDevice = () => {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent || "";
  return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(ua);
};

const isIOSDevice = () => {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent || "";
  return /iPhone|iPad|iPod/i.test(ua);
};

const createGmailWebComposeUrl = ({ to, subject }: EmailComposeOptions) => {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    su: subject,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
};

export const openEmailComposer = ({ to, subject }: EmailComposeOptions) => {
  const encodedTo = encodeURIComponent(to);
  const encodedSubject = encodeURIComponent(subject);

  if (isMobileDevice()) {
    const gmailAppUrl = isIOSDevice()
      ? `googlegmail:///co?to=${encodedTo}&subject=${encodedSubject}`
      : `intent://compose?to=${encodedTo}&subject=${encodedSubject}#Intent;scheme=googlegmail;package=com.google.android.gm;end`;

    window.location.href = gmailAppUrl;

    // Fallback if Gmail app cannot be opened.
    window.setTimeout(() => {
      window.location.href = `mailto:${to}?subject=${encodedSubject}`;
    }, 600);

    return;
  }

  const gmailWebUrl = createGmailWebComposeUrl({ to, subject });
  window.open(gmailWebUrl, "_blank", "noopener,noreferrer");
};
