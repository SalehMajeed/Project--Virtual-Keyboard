document.title = document.querySelector('h1').textContent;

const keyboard = {
  elements: {
    main: null,
    keys_container: null,
    keys: [],
  },

  event_handlers: {
    on_input: null,
    on_close: null,
  },

  properties: {
    value: '',
    caps_lock: false,
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keys_container = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard', '1keyboard--hidden');
    this.elements.keys_container.classList.add('keyboard__keys');

    // Add to DOM
    this.elements.main.appendChild(this.elements.keys_container);
    document.body.appendChild(this.elements.main);
  },

  _create_keys() {},

  _trigger_event(handler_name) {
    console.log('Event Triggered! Event Name: ' + handler_name);
  },

  _toggle_caps_lock() {
    console.log('Caps Lock Toggled!');
  },

  open(initial_value, on_input, on_close) {},

  close() {},
};

window.addEventListener('DOMContentLoader', function () {
  keyboard.init();
});
