interface SideBarRootProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export default function SideBarRoot({ children, isOpen }: SideBarRootProps) {
  return (
    <aside
      className={`fixed md:relative top-0 left-0 h-screen bg-on-primary shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 w-56 md:w-64 lg:w-72 px-6 py-10 gap-6 flex flex-col`}
    >
      {children}
    </aside>
  );
}

