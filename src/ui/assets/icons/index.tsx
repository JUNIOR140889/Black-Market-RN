export default {
  'alert-circle': () => require('./alert-circle/alert-circle.png'),
  eye: () => require('./eye/eye.png'),
  'eye-off': () => require('./eye-off/eye-off.png'),
  'x-circle': () => require('./x-circle/x-circle.png'),
  'info-circle': () => require('./info-circle/info-circle.png'),
  'chevron-down': () => require('./chevron-down/chevron-down.png'),
  'chevron-up': () => require('./chevron-up/chevron-up.png'),
} satisfies Record<string, () => any>;
