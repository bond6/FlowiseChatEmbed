import { createSignal, Show, splitProps, onCleanup, onMount } from 'solid-js';
import styles from '../../../assets/index.css';
import { BubbleButton } from './BubbleButton';
import { BubbleParams } from '../types';
import { Bot, BotProps } from '../../../components/Bot';

const defaultButtonColor = '#3B81F6';
const defaultIconColor = 'white';

export type BubbleProps = BotProps & BubbleParams;

export const Bubble = (props: BubbleProps) => {
  const [bubbleProps] = splitProps(props, ['theme']);

  const [isBotOpened, setIsBotOpened] = createSignal(false);
  const [isBotStarted, setIsBotStarted] = createSignal(false);

  const openBot = () => {
    if (!isBotStarted()) setIsBotStarted(true);
    setIsBotOpened(true);
  };

  const closeBot = () => {
    setIsBotOpened(false);
  };

  const toggleBot = () => {
    isBotOpened() ? closeBot() : openBot();
  };

  onMount(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      const path = event.composedPath();
      const chatbotElement = document.querySelector('flowise-chatbot');
      const contains = path.some((el) => el === chatbotElement);
      console.log(path.some((el) => el === chatbotElement));
      const target = event.target as Node;
      // Assume your chatbot has a ref or a unique class/id you can target

      if (chatbotElement && !contains) {
        if (isBotOpened()) {
          toggleBot();
        }
      }
      console.log('clickOutsideHandler2');
      console.log('event', event);
      console.log('target', target);
      if (chatbotElement) {
        console.log('target', contains);
        console.log('chatbotElement', chatbotElement);
      }
    };

    // Add event listener to the document body
    document.addEventListener('click', clickOutsideHandler);

    // Cleanup the event listener when the component is unmounted
    onCleanup(() => {
      document.removeEventListener('click', clickOutsideHandler);
    });
  });
  return (
    <>
      <style>{styles}</style>
      <BubbleButton {...bubbleProps.theme?.button} toggleBot={toggleBot} isBotOpened={isBotOpened()} />
      <div
        part="bot"
        style={{
          height: bubbleProps.theme?.chatWindow?.height ? `${bubbleProps.theme?.chatWindow?.height.toString()}px` : 'calc(100% - 100px)',
          width: bubbleProps.theme?.chatWindow?.width ? `${bubbleProps.theme?.chatWindow?.width.toString()}px` : undefined,
          transition: 'transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
          'transform-origin': 'bottom right',
          transform: isBotOpened() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
          'box-shadow': 'rgb(0 0 0 / 16%) 0px 5px 40px',
          'background-color': bubbleProps.theme?.chatWindow?.backgroundColor || '#ffffff',
          'z-index': 42424242,
        }}
        class={
          `fixed sm:right-5 rounded-lg w-full sm:w-[400px] max-h-[704px]` +
          (isBotOpened() ? ' opacity-1' : ' opacity-0 pointer-events-none') +
          (props.theme?.button?.size === 'large' ? ' bottom-24' : ' bottom-20')
        }
      >
        <Show when={isBotStarted()}>
          <Bot
            badgeBackgroundColor={bubbleProps.theme?.chatWindow?.backgroundColor}
            bubbleBackgroundColor={bubbleProps.theme?.button?.backgroundColor ?? defaultButtonColor}
            bubbleTextColor={bubbleProps.theme?.button?.iconColor ?? defaultIconColor}
            showTitle={bubbleProps.theme?.chatWindow?.showTitle}
            title={bubbleProps.theme?.chatWindow?.title}
            titleAvatarSrc={bubbleProps.theme?.chatWindow?.titleAvatarSrc}
            welcomeMessage={bubbleProps.theme?.chatWindow?.welcomeMessage}
            poweredByTextColor={bubbleProps.theme?.chatWindow?.poweredByTextColor}
            textInput={bubbleProps.theme?.chatWindow?.textInput}
            botMessage={bubbleProps.theme?.chatWindow?.botMessage}
            userMessage={bubbleProps.theme?.chatWindow?.userMessage}
            fontSize={bubbleProps.theme?.chatWindow?.fontSize}
            chatflowid={props.chatflowid}
            chatflowConfig={props.chatflowConfig}
            apiHost={props.apiHost}
            observersConfig={props.observersConfig}
          />
        </Show>
      </div>
    </>
  );
};
