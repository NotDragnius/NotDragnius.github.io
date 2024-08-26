/*:
 * @target MZ
 * @plugindesc Forces the game to start in fullscreen mode when launched, including from websites.
 * @help This plugin forces the game to start in fullscreen mode.
 */

(() => {
    const _SceneManager_run = SceneManager.run;
    SceneManager.run = function(sceneClass) {
        _SceneManager_run.apply(this, arguments);
        this.forceFullScreen();
    };

    SceneManager.forceFullScreen = function() {
        if (!Graphics._isFullScreen()) {
            Graphics._requestFullScreen();
        }
    };

    // Ensures fullscreen even when reloading or switching scenes
    const _SceneManager_goto = SceneManager.goto;
    SceneManager.goto = function(sceneClass) {
        _SceneManager_goto.call(this, sceneClass);
        this.forceFullScreen();
    };
})();
