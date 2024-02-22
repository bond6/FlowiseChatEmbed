import { Show } from 'solid-js';
import { isNotDefined } from '@/utils/index';
import { ButtonTheme } from '../types';

type Props = ButtonTheme & {
  isBotOpened: boolean;
  toggleBot: () => void;
};

const defaultButtonColor = '#3B81F6';
const defaultIconColor = 'white';
const defaultBottom = '20';
const defaultRight = '20';

export const BubbleButton = (props: Props) => {
  return (
    <button
      part="button"
      onClick={() => props.toggleBot()}
      class={
        `fixed shadow-md rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 flex justify-center items-center animate-fade-in` +
        (props.size === 'large' ? ' w-16 h-16' : ' w-12 h-12')
      }
      style={{
        'background-color': props.backgroundColor ?? defaultButtonColor,
        'z-index': 42424242,
        right: props.right ? `${props.right.toString()}px` : `${defaultRight}px`,
        bottom: props.bottom ? `${props.bottom.toString()}px` : `${defaultBottom}px`,
      }}
    >
      <Show when={isNotDefined(props.customIconSrc)} keyed>
        <img
          src="https://raw.githubusercontent.com/bond6/FlowiseChatEmbed/main/src/assets/smartdnsproxy.png"
          class={
            `stroke-2 fill-transparent absolute duration-200 transition ` +
            (props.isBotOpened ? 'scale-0 opacity-0' : 'scale-100 opacity-100') +
            (props.size === 'large' ? ' w-9' : ' w-7')
          }
        />
      </Show>
      <Show when={props.customIconSrc}>
        <img
          src={props.customIconSrc}
          class={
            'rounded-full object-cover' +
            (props.isBotOpened ? 'scale-0 opacity-0' : 'scale-100 opacity-100') +
            (props.size === 'large' ? ' w-9 h-9' : ' w-7 h-7')
          }
          alt="Bubble button icon"
        />
      </Show>

      <svg
        viewBox="0 0 24 24"
        style={{ fill: props.iconColor ?? 'white' }}
        class={
          `absolute duration-200 transition ` +
          (props.isBotOpened ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-180 opacity-0') +
          (props.size === 'large' ? ' w-9' : ' w-7')
        }
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z"
        />
      </svg>
    </button>
  );
};
