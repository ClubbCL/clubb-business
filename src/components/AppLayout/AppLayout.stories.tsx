import type { Meta, StoryObj } from '@storybook/react';

import { AppLayout } from './AppLayout';

const meta = {
  title: 'Components/AppLayout',
  component: AppLayout,
  tags: ['autodocs'],
  argTypes: {},
  decorators: (Story) => (
    <div className="h-svh">
      <Story />
    </div>
  ),
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    nav: <div className="bg-[#134B70] text-white flex h-full items-center justify-center">Nav</div>,
    header: (
      <div className="bg-[#508C9B] text-white flex w-full h-14 items-center justify-center opacity-50">Header</div>
    ),
    main: (
      <div className="bg-[#EEEEEE] text-black flex flex-col flex-1 items-center justify-center">
        <div className="h-[300px] flex justify-center items-center">Main</div>
        <div className="h-[1000px] p-4">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit consequuntur libero ipsa autem ea iste sunt
          tempora, atque nobis, dolore corporis culpa illum esse quisquam cumque magni aliquid! Explicabo, debitis?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio veniam quo in consequatur a officia numquam
          quisquam illo harum, possimus amet doloribus! Praesentium ratione nostrum odio, eaque reprehenderit sit
          placeat! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis ex libero blanditiis,
          voluptatibus, dignissimos voluptatem facere magnam obcaecati quas eveniet error laboriosam natus sunt repellat
          animi! Odit recusandae fugiat architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis id
          dolores molestiae error unde possimus quia quibusdam. Nostrum voluptates at voluptatem autem impedit voluptate
          quas? Aut nostrum provident sunt omnis. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur enim
          corrupti sequi eaque commodi iste qui officiis totam tempore exercitationem! Fugit reiciendis pariatur natus
          repellendus aliquam nobis quas suscipit voluptas! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nihil eveniet minus alias cupiditate expedita ducimus esse explicabo, quasi nemo ratione, enim accusantium
          autem impedit dolores. Libero quibusdam quos nulla deserunt. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Deleniti, fuga maiores. Error fugit quisquam voluptatem minus vel incidunt eos vero,
          aspernatur vitae, eum alias dolore sequi! Quae blanditiis odit deserunt? Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Nihil modi eveniet commodi enim vitae pariatur possimus cumque? Ratione quis
          laboriosam nostrum, esse modi quod ullam quasi veritatis velit iure dignissimos. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Ipsum numquam quis asperiores earum, eos illum temporibus consequuntur similique
          architecto esse itaque dolores non facilis ipsa molestias cumque quam! Quod, soluta! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Nulla, quasi libero eius consectetur facilis enim ad commodi doloribus
          iusto nihil saepe laudantium placeat. Tenetur iure hic nihil accusantium doloremque! Incidunt! Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Magni soluta impedit autem, aperiam fugiat, qui itaque quas eos
          facilis explicabo rem? Illo, voluptates! Repellendus corporis illum eaque, debitis reiciendis saepe.
        </div>
      </div>
    ),
  },
};
