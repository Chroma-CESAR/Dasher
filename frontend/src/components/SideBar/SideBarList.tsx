interface SideBarListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export default function SideBarList({ children, ...props }: SideBarListProps) {
  return (
    <ul className="flex flex-col gap-6" {...props}>
      {children}
    </ul>
  );
}
