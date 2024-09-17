import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BackButton = ({ ...props }: React.HTMLAttributes<HTMLButtonElement>) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const unlisten = () => {
      setCanGoBack(window.history.state && window.history.state.idx > 0);
    }
    unlisten();
    window.addEventListener('popstate', unlisten);
    return () => {
      window.removeEventListener('popstate', unlisten);
    };
  }, [location]);

  const goBack = () => {
    navigate(-1);
  };

  if (!canGoBack) {
    return null;
  }

  return (
    <button onClick={goBack}
      {...props}
    >
      <ArrowLeft />
    </button>
  );
};

export default BackButton;