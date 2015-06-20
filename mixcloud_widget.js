/**
 * Created by Daniel on 6/20/2015.
 */

module.exports = function MixCloudWidgetModule(pb) {

    /**
     * MixCloudWidget - A plugin for MixCloud Widget
     *
     * @author Daniel Whatley <djwhatley@deeptechstudios.com>
     * @copyright 2015 DeepTech Studios
     */
    function MixCloudWidget(){}

    /**
     * Called when the application is being installed for the first time.
     *
     * @param cb A callback that must be called upon completion.  cb(err, result).
     * The result is ignored
     */
    MixCloudWidget.onInstall = function(cb) {
        cb(null, true);
    };

    /**
     * Called when the application is uninstalling this plugin.  The plugin should
     * make every effort to clean up any plugin-specific DB items or any in function
     * overrides it makes.
     *
     * @param cb A callback that must be called upon completion.  cb(err, result).
     * The result is ignored
     */
    MixCloudWidget.onUninstall = function(cb) {
        cb(null, true);
    };

    /**
     * Called when the application is starting up. The function is also called at
     * the end of a successful install. It is guaranteed that all core PB services
     * will be available including access to the core DB.
     *
     * @param cb A callback that must be called upon completion.  cb(err, result).
     * The result is ignored
     */
    MixCloudWidget.onStartup = function(cb) {
        var MixCloudMediaRenderer = require('./include/mixcloud_media_renderer.js')(pb);
        pb.MediaService.registerRenderer(MixCloudMediaRenderer);

        cb(null, true);
    };

    /**
     * Called when the application is gracefully shutting down.  No guarantees are
     * provided for how much time will be provided the plugin to shut down.
     *
     * @param cb A callback that must be called upon completion.  cb(err, result).
     * The result is ignored
     */
    MixCloudWidget.onShutdown = function(cb) {
        cb(null, true);
    };

    // exports
    return MixCloudWidget;
};
