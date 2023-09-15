import "./fonts.css";

export interface NextButton {
  href: string;
  onClick?: () => void;
}

export interface NextButtonProp {
  props: NextButton;
}

export default function NextButton({ props }: NextButtonProp) {
  const nullOnClick = function () {
    return null;
  };
  return (
    <p
      style={{
        color: "#96B6C5",
        paddingTop: "6vh",
        paddingRight: "47vh",
        textAlign: "right",
        fontFamily: "Gloria Hallelujah",
        fontSize: "24px",
      }}
    >
      <a
        href={props.href}
        onClick={props.onClick ?? nullOnClick}
        style={{ textDecoration: "underline", color: "#96B6C5" }}
      >
        → next
      </a>
    </p>
  );
}
