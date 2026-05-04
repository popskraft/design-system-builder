interface Props { children: React.ReactNode }

export function SectionLabel({ children }: Props) {
  return (
    <div className="text-[10px] uppercase tracking-[.08em] text-slate-600 font-medium mt-5 mb-2.5 first:mt-0">
      {children}
    </div>
  )
}
