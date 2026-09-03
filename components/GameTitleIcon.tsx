import Image from "next/image";

type GameTitleIconProps = {
  src: string;
  alt: string;
  size?: "sm" | "md";
};

export default function GameTitleIcon({ src, alt, size = "md" }: GameTitleIconProps) {
  const dim = size === "sm" ? "h-12 w-12 md:h-14 md:w-14" : "h-16 w-16 md:h-20 md:w-20";

  return (
    <Image
      src={src}
      alt={alt}
      width={80}
      height={80}
      className={`${dim} shrink-0 object-contain mix-blend-multiply transition-transform duration-300 hover:scale-110`}
      priority
    />
  );
}
