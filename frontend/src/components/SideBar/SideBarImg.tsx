import Image, { StaticImageData } from "next/image";

interface SideBarTittleProps {
  img: StaticImageData;
  width?: number;
  height?: number;
}

export default function SideBarImg({ img, width=200, height=200 }: SideBarTittleProps) {
  return (
    <div className="flex items-center">
      <Image src={img} alt="Logo" width={width} height={height} />
    </div>
  );
}
