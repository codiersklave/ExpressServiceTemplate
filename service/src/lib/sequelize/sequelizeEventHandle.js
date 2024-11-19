import {EventEmitter} from 'node:events'

export const EVENT_TYPE_QUERY_WRITE = 'write_query'
export const EVENT_TYPE_QUERY_READ = 'read_query'

export const sequelizeEventHandle = new class extends EventEmitter {
  /**
   * @param {"write_query"} type
   * @param {"read_query"} type
   * @param {EventListener | EventListenerObject | function} listener
   * @param {AddEventListenerOptions | boolean} [options]
   */
}
