/*:
 * @target MZ
 * @plugindesc Adds an option to the options menu to toggle full screen mode.
 * @help This plugin adds a toggle option in the game's options menu to switch between full screen and windowed mode.
 */

(() => {
  const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
  Window_Options.prototype.addGeneralOptions = function() {
    _Window_Options_addGeneralOptions.call(this);
    this.addCommand("Full Screen", "fullScreen");
  };

  const _ConfigManager_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function() {
    const config = _ConfigManager_makeData.call(this);
    config.fullScreen = this.fullScreen || false;
    return config;
  };

  const _ConfigManager_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function(config) {
    _ConfigManager_applyData.call(this);
    this.fullScreen = this.readFlag(config, "fullScreen", false);
    if (this.fullScreen && !Graphics._isFullScreen()) {
      Graphics._switchFullScreen();
    } else if (!this.fullScreen && Graphics._isFullScreen()) {
      Graphics._switchFullScreen();
    }
  };

  const _Window_Options_getConfigValue = Window_Options.prototype.getConfigValue;
  Window_Options.prototype.getConfigValue = function(symbol) {
    if (symbol === "fullScreen") {
      return ConfigManager.fullScreen;
    }
    return _Window_Options_getConfigValue.call(this, symbol);
  };

  const _Window_Options_setConfigValue = Window_Options.prototype.setConfigValue;
  Window_Options.prototype.setConfigValue = function(symbol, value) {
    if (symbol === "fullScreen") {
      ConfigManager.fullScreen = value;
      if (value && !Graphics._isFullScreen()) {
        Graphics._switchFullScreen();
      } else if (!value && Graphics._isFullScreen()) {
        Graphics._switchFullScreen();
      }
    } else {
      _Window_Options_setConfigValue.call(this, symbol, value);
    }
  };
})();
