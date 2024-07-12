export function H1Container({
  children,
  className,
}: React.PropsWithChildren<{
  className: string | undefined
}>): React.ReactNode {
  return <h1 className={className}>{children}</h1>
}

export function H3Container({
  children,
  className,
}: React.PropsWithChildren<{
  className: string | undefined
}>): React.ReactNode {
  return <h3 className={className}>{children}</h3>
}

export function DivContainer({
  children,
  className,
}: React.PropsWithChildren<{
  className: string | undefined
}>): React.ReactNode {
  return <div className={className}>{children}</div>
}
