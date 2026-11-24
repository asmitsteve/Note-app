export function Spinner({ size = 20 }) {
  return <span className="spinner" style={{ width: size, height: size }} />;
}

export default function PageLoader({ text = "Loading..." }) {
  return (
    <div className="page-loader">
      <Spinner size={38} />
      <p>{text}</p>
    </div>
  );
}
