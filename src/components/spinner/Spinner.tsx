import "./spinner.css";
interface ISpinnerProps {
  className: string;
}
function Spinner({ className }: ISpinnerProps) {
  return <div className={`loader ${className}`}></div>;
}

export default Spinner;
