import "./Loading.css";

function Loading({ message = "Loading..." }) {
  return (
    <div className="loading">
      <p>{message}</p>
    </div>
  );
}

export default Loading;