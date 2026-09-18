import Tool from '../DevTools/Tool'
import $ from 'licia/$'
import LocalStore from 'licia/LocalStore'
import Store from 'licia/Store'
import safeStorage from 'licia/safeStorage'
import isEmpty from 'licia/isEmpty'
import stringify from 'licia/stringify'
import defaults from 'licia/defaults'
import isObj from 'licia/isObj'
import uniqId from 'licia/uniqId'
import each from 'licia/each'
import filter from 'licia/filter'
import isStr from 'licia/isStr'
import contain from 'licia/contain'
import clone from 'licia/clone'
import evalCss from '../lib/evalCss'
import LunaSetting from 'luna-setting'

const sessionStorage = safeStorage('session')
const SessionStore = Store.extend({
  initialize: function SessionStore(name, data) {
    this._name = name
    data = data || {}
    let saved = sessionStorage.getItem(name)
    try {
      saved = JSON.parse(saved)
    } catch {
      saved = {}
    }
    if (!isObj(saved)) saved = {}
    data = defaults(saved, data)
    this.callSuper(Store, 'initialize', [data])
  },
  save: function (data) {
    if (isEmpty(data)) return sessionStorage.removeItem(this._name)
    sessionStorage.setItem(this._name, stringify(data))
  },
})

export default class Settings extends Tool {
  constructor() {
    super()

    this._style = evalCss(require('./Settings.scss'))

    this.name = 'settings'
    this._settings = []
  }
  init($el) {
    super.init($el)

    this._setting = new LunaSetting($el.get(0))

    this._bindEvent()
  }
  remove(config, key) {
    if (isStr(config)) {
      const self = this
      this._$el.find('.luna-setting-item-title').each(function () {
        const $this = $(this)
        if ($this.text() === config) {
          self._setting.remove(this.settingItem)
        }
      })
    } else {
      this._settings = filter(this._settings, (setting) => {
        if (setting.config === config && setting.key === key) {
          this._setting.remove(setting.item)
          return false
        }

        return true
      })
    }

    this._cleanSeparator()

    return this
  }
  destroy() {
    this._setting.destroy()
    super.destroy()

    evalCss.remove(this._style)
  }
  clear() {
    this._settings = []
    this._setting.clear()
  }
  switch(config, key, desc) {
    const id = this._genId()

    const item = this._setting.appendCheckbox(id, !!config.get(key), desc)
    this._settings.push({ config, key, id, item })

    return this
  }
  select(config, key, desc, selections) {
    const id = this._genId()

    const selectOptions = {}
    each(selections, (selection) => (selectOptions[selection] = selection))
    const item = this._setting.appendSelect(
      id,
      config.get(key),
      '',
      desc,
      selectOptions
    )
    this._settings.push({ config, key, id, item })

    return this
  }
  range(config, key, desc, { min = 0, max = 1, step = 0.1 }) {
    const id = this._genId()

    const item = this._setting.appendNumber(id, config.get(key), desc, {
      max,
      min,
      step,
      range: true,
    })
    this._settings.push({ config, key, min, max, step, id, item })

    return this
  }
  button(text, handler) {
    this._setting.appendButton(text, handler)

    return this
  }
  separator() {
    this._setting.appendSeparator()

    return this
  }
  text(text) {
    this._setting.appendTitle(text)

    return this
  }
  // Merge adjacent separators
  _cleanSeparator() {
    const children = clone(this._$el.get(0).children)

    function isSeparator(node) {
      return contain(node.getAttribute('class'), 'luna-setting-item-separator')
    }

    for (let i = 0, len = children.length; i < len - 1; i++) {
      if (isSeparator(children[i]) && isSeparator(children[i + 1])) {
        $(children[i]).remove()
      }
    }
  }
  _genId() {
    return uniqId('eruda-settings')
  }
  _getSetting(id) {
    let ret

    each(this._settings, (setting) => {
      if (setting.id === id) ret = setting
    })

    return ret
  }
  _bindEvent() {
    this._setting.on('change', (id, val) => {
      const setting = this._getSetting(id)
      setting.config.set(setting.key, val)
    })
  }
  static createCfg(name, data, storage = 'local') {
    const key = 'eruda-' + name
    if (storage === 'session') {
      return new SessionStore(key, data)
    }
    return new LocalStore(key, data)
  }
}
