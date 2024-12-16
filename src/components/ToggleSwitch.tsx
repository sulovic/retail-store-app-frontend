const ToggleSwitch: React.FC<{
  enabled: boolean;
  handleToggle: () => void;
}> = ({ enabled, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors ${enabled ? "bg-blue-500" : "bg-gray-300"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`}
      />
    </div>
  );
};

export default ToggleSwitch;
