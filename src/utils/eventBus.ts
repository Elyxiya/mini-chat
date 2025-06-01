/**
 * 事件处理器函数类型
 * 接受任意数量和类型的参数，不返回值
 */
type EventHandler = (...args: any[]) => void;

/**
 * 事件总线类 - 实现发布-订阅模式的事件系统
 * 用于组件间解耦通信，支持事件的注册、触发、取消和清理
 */
class EventBus {
    /**
     * 存储事件和对应的处理器集合
     * - 键：事件名称
     * - 值：该事件对应的处理器函数集合
     */
    private events: Map<string, Set<EventHandler>> = new Map();

    /**
     * 注册事件处理器
     * @param event - 事件名称
     * @param handler - 事件触发时执行的回调函数
     */
    on(event: string, handler: EventHandler) {
        // 若事件不存在，创建新的事件条目
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        // 将处理器添加到对应事件的集合中
        this.events.get(event)!.add(handler);
    }

    /**
     * 取消注册事件处理器
     * @param event - 事件名称
     * @param handler - 需要取消的回调函数（必须是同一个引用）
     */
    off(event: string, handler: EventHandler) {
        // 若事件存在，则从集合中删除指定处理器
        if (this.events.has(event)) {
            this.events.get(event)!.delete(handler);
        }
    }

    /**
     * 触发事件，执行所有注册的处理器
     * @param event - 事件名称
     * @param args - 传递给事件处理器的参数
     */
    emit(event: string, ...args: any[]) {
        // 若事件存在，遍历并执行所有注册的处理器
        if (this.events.has(event)) {
            this.events.get(event)!.forEach(handler => handler(...args));
        }
    }

    /**
     * 清理所有事件和处理器
     * 通常在应用卸载或需要重置状态时调用
     */
    clear() {
        this.events.clear();
    }
}

/**
 * 全局事件总线实例
 * 应用内共享同一个事件总线，用于跨组件通信
 */
const eventBus = new EventBus();
export default eventBus;