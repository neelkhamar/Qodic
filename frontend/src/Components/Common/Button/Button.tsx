import "./Button.css";

interface PrimaryButtonProps {
  type: any;
  label: string;
  onClick?: any;
  loading?: boolean;
}

function PrimaryButton({
  type = "button",
  label,
  onClick,
  loading = false,
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={type === "submit" ? null : onClick}
      disabled={loading}
      aria-label={label}
      className="w-full flex justify-center py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {loading ? <div className="button-loader"></div> : label}
    </button>
  );
}

export default PrimaryButton;
