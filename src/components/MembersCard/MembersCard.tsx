interface MembersCardProps {
  totalMembers: number;
  newMembers: number;
  membersUrl: string;
  className?: string;
}

export function MembersCard({ totalMembers, newMembers, membersUrl, className = '' }: MembersCardProps) {
  return (
    <div className={`w-full rounded-2xl border border-gray-200 p-6 ${className}`}>
      <h3 className="text-sm font-semibold">Miembros</h3>

      <div className="mt-6">
        <div className="text-4xl font-semibold leading-[36px] tracking-[-0.25px] text-gray-900">
          {totalMembers.toLocaleString()}
        </div>
        <div className="mt-0.5 text-[13px] text-gray-400">Total miembros</div>
      </div>

      <div className="mt-5 mb-5">
        <div className="text-lg font-semibold text-gray-900">{newMembers.toLocaleString()}</div>
        <div className="mt-0.5 text-[13px] text-gray-400">Nuevos miembros últimos 7 días</div>
      </div>

      <a href={membersUrl} className="text-[13px] text-slate-500 underline hover:opacity-80">
        Ir a Miembros
      </a>
    </div>
  );
}
