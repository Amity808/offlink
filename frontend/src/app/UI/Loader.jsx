import { ImSpinner8 } from 'react-icons/im';
const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full m-auto">
      <ImSpinner8 className="w-10 h-10  text-brand-success-primary animate-spin" />
    </div>
  );
};

export default Loader;
