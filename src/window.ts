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
const isClickInsideChatbot = (target:any, chatbotElement:any) => {
  return chatbotElement.contains(target);
};
export const init = (props: BotProps, propsBtn: Props) => {
  const element = document.createElement('flowise-chatbot');
  
  

  Object.assign(element, props);
  document.body.appendChild(element);
    // Add event listener to the body
    document.body.addEventListener('click', (event) => {
      // Assuming `chatbotElement` is the DOM element of your chatbot
      const chatbotElement = document.querySelector('flowise-chatbot');
    
      // If the click is not inside the chatbot, toggle it
      if (!isClickInsideChatbot(event.target, chatbotElement)) {
        // Assuming `toggleBot` is the function that toggles the chatbot visibility
        propsBtn.toggleBot();
      }
    });
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
