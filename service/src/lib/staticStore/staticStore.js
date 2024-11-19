import {StaticDataStore} from "#lib/staticStore/StaticDataStore";
import {sequelizeEventHandle} from "#lib/sequelize/sequelizeEventHandle";

const options = {
  debounceTimeout: 500,
  updateDelay: () => Math.ceil(Math.random() * 5000),
  hooks: {
    /**
     * Transforms model objects to their table names before registration.
     * This allows the StaticDataStore to react to updates based on table names.
     *
     * @param {string} ident The unique identifier for the data loader.
     * @param {function} loadCallback The callback function to load data.
     * @param {{tableName: string}[]} updateIdents An array of models with their table names.
     * @returns {object} The transformed parameters with model table names.
     */
    beforeRegister(ident, loadCallback, updateIdents) {
      return {
        ident,
        loadCallback,
        updateIdents: updateIdents.map(model => model.tableName)
      }
    }
  },
};

const staticDataStore = new StaticDataStore(options)

sequelizeEventHandle.on('write_query', async (model) => {
  staticDataStore.update(model.tableName);
});

export const registerStaticDbData = (ident, loadCallback, models) => {
  staticDataStore.register(ident, loadCallback, models);
}

export const awaitStaticDbPreloading = async () => {
  return staticDataStore.awaitPreloading();
}

export const getStaticDbData = (ident) => {
  return staticDataStore.get(ident)
}
