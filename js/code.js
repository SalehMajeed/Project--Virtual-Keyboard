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
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keys_container.classList.add('keyboard__keys');
    this.elements.keys_container.appendChild(this._create_keys());

    this.elements.keys = this.elements.keys_container.querySelector(
      '.keyboard__key'
    );

    // Add to DOM
    this.elements.main.appendChild(this.elements.keys_container);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements wit .use-keyboard-input
    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (current_value) => {
          element.value = current_value;
        });
      });
    });
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
            this._trigger_event('oninput');
          });
          break;

        case 'space':
          key_element.classList.add('keyboard__key--extra-wide');
          key_element.innerHTML = create_icon_html('space_bar');

          key_element.addEventListener('click', () => {
            this.properties.value += '\n';
            this._trigger_event('oninput');
          });
          break;

        case 'done':
          key_element.classList.add(
            'keyboard__key---wide',
            'keyboard__key--dark'
          );
          key_element.innerHTML = create_icon_html('check_circle');

          key_element.addEventListener('click', () => {
            this.close();
            this._trigger_event('onclose');
          });
          break;

        default:
          key_element.textContent = key.toLowerCase();

          key_element.addEventListener('click', () => {
            this.properties.value += this.properties.caps_lock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._trigger_event('oninput');
          });
          break;
      }

      fragment.appendChild(key_element);

      if (insert_line_break) {
        fragment.appendChild(document.createElement('br'));
      }
    });
    return fragment;
  },

  _trigger_event(handler_name) {
    if (typeof this.event_handlers[handler_name] == 'function') {
      this.event_handlers[handler_name](this.properties.value);
    }
  },

  _toggle_caps_lock() {
    this.properties.caps_lock = !this.properties.caps_lock;

    for (const key of this.elements.keys)
      if (key.childElementCount == 0) {
        key.textContent = this.properties.caps_lock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
  },

  open(initial_value, on_input, on_close) {
    this.properties.value = initial_value || '';
    this.event_handlers.oninput = on_input;
    this.event_handlers.onclose = on_close;
    this.elements.main.classList.remove('keyboard--hidden');
  },

  close() {
    this.properties.value = '';
    this.event_handlers.on_input = oninput;
    this.event_handlers.on_close = onclose;
    this.elements.main.classList.add('keyboard--hidden');
  },
};

window.addEventListener('DOMContentLoaded', function () {
  keyboard.init();
});
