export default {
    'alert-circle': () => require('./alert-circle/alert-circle.png'),
    'eye': () => require('./eye/eye.png'),
    'eye-off': () => require('./eye-off/eye-off.png'),
    //'alert-triangle': () => require('./alert-triangle/alert-triangle.png'),
    'x-circle': () => require('./x-circle/x-circle.png'),
    'info-circle': () => require('./info-circle/info-circle.png'),
  } satisfies Record<string, () => any>;
  