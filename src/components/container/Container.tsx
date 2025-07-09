interface Container {
  children: React.ReactNode;
  className?: string
}
function Container({ children, className }: Container) {
  return <div className={`px-8 md:px-16 mx-auto ${className}`}>{children}</div>;
}

export default Container;
