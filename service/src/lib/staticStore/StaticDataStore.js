import {DataLoader} from "#lib/staticStore/DataLoader";

export class StaticDataStore {
  #registrations = {};
  #storedData = {};
  #debounceMap = {};

  /**
   * @callback beforeRegister
   * @param {string} ident
   * @param {OnLoadCallback} loadCallback
   * @param {[]} updateIdents
   * @return {{ident: string, loadCallback: OnLoadCallback, updateIdents: []}}
   */

  /**
   * @typedef Hooks
   * @property {beforeRegister} [beforeRegister]
   */

  /**
   * @typedef StaticDataStore.Options
   * @property {number} [debounceTimeout]
   * @property {Hooks} [hooks]
   * @property {UpdateDelayCallback|number} [updateDelay]
   */
  #options;
  #preloadPromises = [];

  constructor (options) {
    this.#options = options;
  }

  update(updateIdent, debounceTimeout) {
    debounceTimeout ??= this.#options?.debounceTimeout;

    if (!this.#registrations[updateIdent]) {
      return;
    }

    if (this.#debounceMap[updateIdent]) {
      clearTimeout(this.#debounceMap[updateIdent]);
      this.#debounceMap[updateIdent] = undefined;
    }

    if (debounceTimeout === undefined) {
      this.#registrations[updateIdent].forEach((loader) => loader.notify());
    } else {
      this.#debounceMap[updateIdent] = setTimeout(() => {
        this.#registrations[updateIdent].forEach((loader) => loader.notify());
      }, debounceTimeout);
    }
  }

  async awaitPreloading() {
    await Promise.all(this.#preloadPromises);
    this.#preloadPromises = [];
    return true;
  }

  register(ident, loadCallback, updateIdents, options) {

    const updateDelay = options?.updateDelay ?? this.#options?.updateDelay;

    if (this.#options?.hooks?.beforeRegister) {
      const result = this.#options.hooks.beforeRegister(ident, loadCallback, updateIdents);
      ident = result.ident;
      loadCallback = result.loadCallback;
      updateIdents = result.updateIdents;
    }

    const loader = new DataLoader(loadCallback, (data) => {
      this.#storedData[ident] = data;
    }, {updateDelay});

    this.#preloadPromises.push(loader.load());

    for (const updateIdentifier of updateIdents) {
      this.#registrations[updateIdentifier] ??= [];
      this.#registrations[updateIdentifier].push(loader);
    }
  }

  get(ident) {
    return this.#storedData[ident];
  }
}
