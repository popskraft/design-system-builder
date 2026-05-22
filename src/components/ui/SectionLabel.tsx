interface Props { children: React.ReactNode }

export function SectionLabel({ children }: Props) {
  return (
    <div className="text-[10px] uppercase tracking-widest text-[#737373] font-medium mt-5 mb-2 first:mt-0">
      {children}
    </div>
  )
}
