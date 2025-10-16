import EventEmitter from 'events';
import { IMessagePoster, IMessageReceiver, RPCMessage } from './types.cjs';

interface IRPCOptions {
    target: IMessagePoster;
    requesterId: string;
    origin?: string;
    protocolVersion?: string;
    receiver?: IMessageReceiver;
}
declare class IFrameRPC extends EventEmitter {
    private readonly options;
    readonly isReady: Promise<void>;
    private calls;
    private lastCallId;
    private remoteProtocolVersion;
    private readonly removeMessageListener;
    /**
     * Creates an instance of IFrameRPC.
     * @param options The configuration options for IFrameRPC.
     */
    constructor(options: IRPCOptions);
    private createReadyPromise;
    /**
     * Static method to get a ready instance of IFrameRPC based on the provided options.
     * @param options The configuration options for IFrameRPC.
     * @returns A Promise that resolves to the ready IFrameRPC instance.
     */
    static getReadyInstance(options: IRPCOptions): Promise<IFrameRPC>;
    /**
     * Binds a method handler for the specified RPC method.
     * @param method The RPC method name.
     * @param handler The method handler function.
     * @returns The current IFrameRPC instance.
     */
    bindMethodHandler<T>(method: string, handler: (params: T) => Promise<any> | any): this;
    /**
     * Calls an RPC method with the specified method name and parameters.
     * @param method The RPC method name.
     * @param params The parameters for the RPC method.
     * @returns A Promise that resolves with the result of the RPC method.
     */
    callMethod<T>(method: string, params: object): Promise<T>;
    /**
     * Destroys the IFrameRPC instance, removing event listeners.
     */
    destroy(): void;
    /**
     * Retrieves the remote protocol version.
     * @returns The remote protocol version.
     */
    remoteVersion(): string | undefined;
    private handleResponse;
    private post;
    static isReadySignal(message: RPCMessage<any>): boolean;
    private messageEventListener;
    private handleMessage;
}

export { IFrameRPC, type IRPCOptions };
