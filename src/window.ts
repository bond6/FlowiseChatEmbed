import { observersConfigType } from './components/Bot';
import { ButtonTheme } from './features/bubble/types';

type Props = ButtonTheme & {
  isBotOpened: boolean;
  toggleBot: () => void;
};
/* eslint-disable solid/reactivity */
type BotProps = {
  chatflowid: string;
  apiHost?: string;
  chatflowConfig?: Record<string, unknown>;
  observersConfig?: observersConfigType;
};

export const initFull = (props: BotProps & { id?: string }) => {
  const fullElement = props.id ? document.getElementById(props.id) : document.querySelector('flowise-fullchatbot');
  if (!fullElement) throw new Error('<flowise-fullchatbot> element not found.');
  Object.assign(fullElement, props);
};
const isClickInsideChatbot = (target: any, chatbotElement: any) => {
  return chatbotElement.contains(target);
};
export const init = (props: BotProps, propsBtn: Props) => {
  const element = document.createElement('flowise-chatbot');
  Object.assign(element, props);

  // Function to add the event listener to the body
  const addBodyClickListener = () => {
    // Define a new event handler
    const clickOutsideHandler = (event:any) => {
      const chatbotElement = document.querySelector('flowise-chatbot');
      if (chatbotElement && !isClickInsideChatbot(event.target, chatbotElement)) {
        propsBtn.toggleBot();
      }
    };

    // Add the event listener to the body
    document.body.addEventListener('click', clickOutsideHandler);
  };

  // Append the chatbot element to the body
  document.body.appendChild(element);

  if (document.readyState === 'loading') {  // The document is still loading
    document.addEventListener('DOMContentLoaded', addBodyClickListener);
  } else {  // The document is already loaded
    addBodyClickListener();
  }
};

type Chatbot = {
  initFull: typeof initFull;
  init: typeof init;
};

declare const window:
  | {
      Chatbot: Chatbot | undefined;
    }
  | undefined;

export const parseChatbot = () => ({
  initFull,
  init,
});

export const injectChatbotInWindow = (bot: Chatbot) => {
  if (typeof window === 'undefined') return;
  window.Chatbot = { ...bot };
};
