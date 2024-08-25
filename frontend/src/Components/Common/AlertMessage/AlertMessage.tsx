interface AlertProps {
  message: string;
}

function AlertMessage({ message }: AlertProps) {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 text-sm px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
}

export default AlertMessage;
