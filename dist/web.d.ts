declare const chatbot: {
    initFull: (props: {
        chatflowid: string;
        apiHost?: string | undefined;
        chatflowConfig?: Record<string, unknown> | undefined;
        observersConfig?: import("./components/Bot").observersConfigType | undefined;
    } & {
        id?: string | undefined;
    }) => void;
    init: (props: {
        chatflowid: string;
        apiHost?: string | undefined;
        chatflowConfig?: Record<string, unknown> | undefined;
        observersConfig?: import("./components/Bot").observersConfigType | undefined;
    }, propsBtn: import("./features/bubble/types").ButtonTheme & {
        isBotOpened: boolean;
        toggleBot: () => void;
    }) => void;
};
export default chatbot;
//# sourceMappingURL=web.d.ts.map