const Skeleton = ({ className = "" } : { className?: string }) => {
  return <div className={`bg-gray-300 w-20 h-12 animate-pulse  ${className}`}></div>;
};

export default Skeleton;