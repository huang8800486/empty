import mitt from 'mitt';

type Emits<EventType extends string | symbol, T> = {
  on(type: EventType, handler: (arg: T) => void): void;
  off(type: EventType, handler: (arg: T) => void): void;
  emit(type: EventType, arg?: T): void;
};

// 存在多个定义变量时，& 符号连接Emits
// type Emitter = Emits<'a', number> & Emits<'b', string>;
type Emitter = Emits<string, any>;

const emitter: Emitter = mitt<Emitter>();
export default emitter;
