import { Fragment } from 'react';

import { useFloating, autoPlacement, offset } from '@floating-ui/react';
import { Popover, Transition } from '@headlessui/react';
import { Float } from '@headlessui-float/react';

export const FormattingHelp = () => {
  return (
    <Popover as={Fragment}>
      <Float
        portal
        enter="transition origin-bottom-left duration-100 ease-out"
        enterFrom="scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition origin-bottom-left duration-100 ease-in"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0"
        middleware={[offset(12), autoPlacement({ allowedPlacements: ['top-end', 'right-end'] })]}
      >
        <Popover.Button className="rounded px-3 py-1 h-8 cursor-pointer bg-gray-200 hover:bg-gray-100 text-sm transition-colors">
          Formatting help
        </Popover.Button>
        <Popover.Panel className="rounded bg-white shadow-sm shadow-black/10 p-4">
          <ul>
            <li># Heading 1</li>
            <li>## Heading 2</li>
            <li>### Heading 3</li>
            <li>#### Heading 4</li>
            <li>##### Heading 5</li>
            <li>###### Heading 6</li>
            <li className="italic">_Italic_ or *Italic*</li>
            <li className="font-bold">__Bold__ or **Bold**</li>
            <li>
              ~~<span className="line-through">Strikethrough</span>~~
            </li>
            <li>Paragraph</li>
            <li>
              --- <span className="text-sm text-gray-300">(divider)</span>
            </li>
          </ul>
        </Popover.Panel>
      </Float>
    </Popover>
  );
};
