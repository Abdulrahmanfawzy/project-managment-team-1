import { GlobeCheck, GlobeOff } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { toast } from "react-hot-toast";
const InternetServiceProvider = ({ children }: { children: ReactNode }) => {
  const offlineToastId = useRef<string | null>(null);

  const showOfflineToast = () => {
    if (offlineToastId.current) return;
    offlineToastId.current = toast(
      () => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <GlobeOff size={20} />
          <div>
            <strong>You’re offline</strong>
            <div style={{ fontSize: "14px" }}>
              Please check your internet connection
            </div>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: {
          background: "#FEF3C7",
          color: "#92400E",
          border: "1px solid #FDE68A",
        },
      },
    );
  };

  const showOnlineToast = () => {
    if (offlineToastId.current) {
      toast.dismiss(offlineToastId.current);
      offlineToastId.current = null;
    }

    toast(
      () => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "999px",
              background: "#DCFCE7",
              color: "#166534",
            }}
          >
            <GlobeCheck size={18} />
          </div>
          <div>
            <strong>Back online</strong>
            <div style={{ fontSize: "14px", color: "#166534" }}>
              Your connection has been restored
            </div>
          </div>
        </div>
      ),
      {
        duration: 3000,
        style: {
          background: "#ECFDF3",
          color: "#166534",
          border: "1px solid #A7F3D0",
        },
      },
    );
  };

  useEffect(() => {
    window.addEventListener("offline", showOfflineToast);
    window.addEventListener("online", showOnlineToast);

    return () => {
      window.removeEventListener("offline", showOfflineToast);
      window.removeEventListener("online", showOnlineToast);
    };
  }, []);
  return children;
};

export default InternetServiceProvider;
