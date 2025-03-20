interface Member {
  name: string;
  value: number;
}

interface Top5MembersCardProps {
  members: Member[];
  membersUrl: string;
  className?: string;
}

export function Top5MembersCard({ members, membersUrl, className = '' }: Top5MembersCardProps) {
  return (
    <div className={`w-full rounded-2xl border border-gray-200 p-6 ${className}`}>
      <h3 className="text-[14px] font-medium text-gray-600">Top 5 miembros</h3>

      <div className="mt-1.5 space-y-3.5">
        {members.map((member) => (
          <div key={member.name} className="flex items-center justify-between">
            <div className="text-sm text-gray-600">{member.name}</div>
            <div className="text-[16px] font-medium text-[#4F46E5]">{member.value.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <a href={membersUrl} className="mt-3.5 inline-block text-[13px] text-[#83819E] underline hover:opacity-80">
        Ir a Miembros
      </a>
    </div>
  );
}
