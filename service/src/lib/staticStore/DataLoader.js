export class DataLoader {
  /**
   * @callback OnLoadCallback
   * @returns {any|Promise<any>}
   */
  #loadCallback;

  /**
   * @callback OnSaveCallback
   * @param {any} data
   * @return {void}
   */
  #onSave;

  /**
   * @callback UpdateDelayCallback
   * @returns {number}
   */
  #updateDelay;

  constructor (loadCallback, onSave, { updateDelay }) {
    this.#loadCallback = loadCallback;
    this.#onSave = onSave;

    if (typeof updateDelay === 'number') {
      updateDelay = () => updateDelay;
    }

    this.#updateDelay = updateDelay;
  }

  async load() {
    const data = await this.#loadCallback();
    this.#onSave(data);
  }

  notify() {
    if (!this.#updateDelay) {
      this.load().catch(e => console.error(e));
      return;
    }

    setTimeout(async () => {
      await this.load();
    }, this.#updateDelay());
  }
}