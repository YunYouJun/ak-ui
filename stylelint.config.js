module.exports = {
  // https://stylelint.io/user-guide/configuration\
  "extends": "stylelint-config-recommended-scss",
  "rules": {
    "property-no-unknown": [true, {
      "ignoreProperties": ["position-area"]
    }],
    "selector-pseudo-class-no-unknown": [true, {
      "ignorePseudoClasses": ["popover-open"]
    }]
  }
};
