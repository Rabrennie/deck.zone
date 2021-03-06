
import * as Plugins from './plugins/_plugins';

import _ from 'lodash';

const PLUGINS = _.mapKeys(Plugins, (value, key) => key.toLowerCase());

const defaultState = {
  font: {
    family: 'Arial',
    size: 10,
    unit: 'pt',
    color: '#000',
    decoration: ''
  },
  unit: 'cm',
  card: {
    width: '6cm',
    height: '9cm',
    'border-style': 'none',
    'border-width': '1px',
    'border-color': '#000'
  }
};

class InternalState {
  constructor() {
    this.cards = [];
    this.options = _.cloneDeep(defaultState);
  }

  newCard() {
    return { texts: [] };
  }
}

export class DecklangState {

  constructor() {
    this.internalState = this.newState();
  }

  newState() {
    return new InternalState();
  }

  runPlugin(state, plugin, scope = {}) {
    if(!PLUGINS[plugin.call]) throw new Error(`Plugin '${plugin.call}' does not exist.`);
    PLUGINS[plugin.call].operate(plugin, state, scope);
  }
}