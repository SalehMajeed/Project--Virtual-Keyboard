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

  _create_keys() {
    const fragment = document.createDocumentFragment();
    const key_layout = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      'backspace',
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      'caps',
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      'enter',
      'done',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      ',',
      '.',
      '?',
      'space',
    ];

    // Create HTML for an icon
    const create_icon_html = (icon_name) => {
      return '<i class="material-icon">${icon_name}</i>';
    };

    key_layout.forEach((key) => {
      const key_element = document.createElement('button');
      const insert_line_break =
        ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;

      // Add attributes/classes
      key_element.setAttribute('type', 'button');
      key_element.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          key_element.classList.add('keyboard__key--wide');
          key_element.innerHTML = create_icon_html('backspace');

          key_element.addEventListener('click', () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length
            );
            this._trigger_event('oninput');
          });
          break;

        case 'caps':
          key_element.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable'
          );
          key_element.innerHTML = create_icon_html('keyboard_capslock');

          key_element.addEventListener('click', () => {
            this._toggle_caps_lock();
            key_element.classList.toggle(
              'keyboard__key--active',
              this.properties.caps_lock
            );
          });
          break;

        case 'enter':
          key_element.classList.add('keyboard__key--wide');
          key_element.innerHTML = create_icon_html('keyboard_return');

          key_element.addEventListener('click', () => {
            this.properties.value += '\n';
            key_element.classList.toggle(
              'keyboard__key--active',
              this.properties.caps_lock
            );
          });
          break;
      }
    });
  },

  _trigger_event(handler_name) {
    console.log('Event Triggered! Event Name: ' + handler_name);
  },

  _toggle_caps_lock() {
    console.log('Caps Lock Toggled!');
  },

  open(initial_value, on_input, on_close) {},

  close() {},
};

window.addEventListener('DOMContentLoaded', function () {
  keyboard.init();
});
