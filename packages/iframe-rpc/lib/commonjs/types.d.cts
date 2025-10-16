type RPCMessage<T> = IRPCMethod<T> | IRPCResponse<T>;
interface IRPCMethod<T> {
    type: 'method';
    requesterId: string;
    id: number;
    method: string;
    params: T;
}
interface IRPCResponse<T> {
    type: 'response';
    requesterId: string;
    id: number;
    result: T;
    error?: {
        code: number;
        message: string;
    };
}
declare function isRPCMessage(data: any): data is RPCMessage<any>;
interface IMessageEvent {
    data: any;
    origin: string;
}
interface IMessagePoster {
    postMessage(data: any, targetOrigin: string): void;
}
interface IMessageReceiver {
    readMessages(callback: (ev: IMessageEvent) => void): () => void;
}
declare const windowReceiver: IMessageReceiver;

export { type IMessageEvent, type IMessagePoster, type IMessageReceiver, type IRPCMethod, type IRPCResponse, type RPCMessage, isRPCMessage, windowReceiver };
