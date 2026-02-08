import { FaRegFaceFrown } from "react-icons/fa6";

type EmptySectionProps = {
  message: string;
};

function EmptySection({ message }: EmptySectionProps) {
  return (
    <div className="text-center flex flex-col gap-3 pb-8">
      <p className="text-gray-400 text-lg">{message}</p>
      <div className="text-gray-400 text-xl flex justify-center">
        <FaRegFaceFrown className="text-2xl" />
      </div>
    </div>
  );
}

export default EmptySection;
