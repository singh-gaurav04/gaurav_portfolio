export default function ChatFooter({ config }) {
  const label = config?.privacy_policy_label || "Contact Gaurav";
  const url = config?.privacy_policy_url || "#contact";
  const external = /^https?:\/\//i.test(url);
  const parts = label.split("Privacy Policy");
  const linkProps = external ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <div className="shrink-0 border-t border-[#ECEFF2] px-5 py-3 text-center text-[14px] text-[#7A8088]">
      {parts.length > 1 ? (
        <>
          {parts[0]}
          <a href={url} {...linkProps} className="underline hover:text-[#4B5563]">
            Privacy Policy
          </a>
          {parts[1]}
        </>
      ) : (
        <a href={url} {...linkProps} className="underline hover:text-[#4B5563]">
          {label}
        </a>
      )}
    </div>
  );
}
