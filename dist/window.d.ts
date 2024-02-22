import { observersConfigType } from './components/Bot';
import { ButtonTheme } from './features/bubble/types';
type Props = ButtonTheme & {
    isBotOpened: boolean;
    toggleBot: () => void;
};
type BotProps = {
    chatflowid: string;
    apiHost?: string;
    chatflowConfig?: Record<string, unknown>;
    observersConfig?: observersConfigType;
};
export declare const initFull: (props: BotProps & {
    id?: string;
}) => void;
export declare const init: (props: BotProps, propsBtn: Props) => void;
type Chatbot = {
    initFull: typeof initFull;
    init: typeof init;
};
export declare const parseChatbot: () => {
    initFull: (props: BotProps & {
        id?: string;
    }) => void;
    init: (props: BotProps, propsBtn: Props) => void;
};
export declare const injectChatbotInWindow: (bot: Chatbot) => void;
export {};
//# sourceMappingURL=window.d.ts.map