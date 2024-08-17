export interface FakePageProps {
  title: string;
}

export const FakePage: React.FC<FakePageProps> = ({ title }) => {
  return (
    <div className="text-gray-900 text-sm">
      <div className="text-xl">{title}</div>
      <div className="flex w-full gap-6 mt-10">
        <div className="flex flex-1 h-[200px] bg-slate-100 rounded-xl justify-center items-center p-3">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam dolor atque ut quod nostrum unde
          dignissimos, porro, maiores obcaecati aperiam adipisci eveniet optio aut harum sint? Ea sed quibusdam tenetur.
        </div>
        <div className="flex flex-1 h-[200px] bg-slate-100 rounded-xl justify-center items-center p-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum sit repudiandae, totam quasi nulla fugit qui
          delectus aspernatur pariatur dolore! Quam rerum aliquid assumenda fuga ad optio unde temporibus quo?
        </div>
      </div>
      <div className="flex flex-1 h-[500px] bg-slate-100 rounded-xl mt-6" />
      <div className="flex w-full gap-6 my-6">
        <div className="flex flex-1 h-[400px] bg-slate-100 rounded-xl" />
        <div className="flex flex-1 h-[400px] bg-slate-100 rounded-xl" />
        <div className="flex flex-1 h-[400px] bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
};
