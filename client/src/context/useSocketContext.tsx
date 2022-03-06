import { useState, useContext, createContext, FunctionComponent, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface ISocketContext {
  socket: Socket | undefined;
  initSocket: () => void;
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
  initSocket: () => null,
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  const initSocket = useCallback(() => {
    console.log('trying to connect');
    const newSocket = io('/', {
      withCredentials: true,
    });
    setSocket(newSocket);
    newSocket.on('connect', () => {
      console.log('socket connected');
    });
    newSocket.on('disconnect', (reason) => {
      console.log('disconnect ' + reason);
    });
  }, []);

  return <SocketContext.Provider value={{ socket, initSocket }}>{children}</SocketContext.Provider>;
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}
