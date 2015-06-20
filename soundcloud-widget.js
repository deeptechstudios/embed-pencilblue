/**
 * SoundCloudWidget - A plugin for SoundCloud Widget
 *
 * @author Daniel Whatley <danieljwhatley@gmail.com>
 * @copyright 2015 MeanTech
 */
function SoundCloudWidget(){}

/**
 * Called when the application is being installed for the first time.
 *
 * @param cb A callback that must be called upon completion.  cb(err, result).
 * The result is ignored
 */
SoundCloudWidget.onInstall = function(cb) {
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
SoundCloudWidget.onUninstall = function(cb) {
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
SoundCloudWidget.onStartup = function(cb) {
    var SCMediaRenderer = require('./include/soundcloud_media_renderer.js');
    pb.MediaService.registerRenderer(SCMediaRenderer);

    pb.TemplateService.registerGlobal('soundcloud_icon', function(flag, cb) {
        pb.plugins.getSettingsKV('soundcloud-widget', function(err, settings) {
            var opts = {
                where: {settings_type: 'icon_settings'}
            };

            var dao = new pb.DAO();
            dao.q('sc_widget_settings', opts, function (err, iconSettings) {
                if (iconSettings.length > 0) {
                    iconSettings = iconSettings[0];
                }
                else {
                    iconSettings = {
                        colors: 'orange_white',
                        size: 32
                    }
                }

                var ts = new pb.TemplateService();
                ts.registerLocal('soundcloud_profile_name', settings.soundcloud_profile_name);
                ts.registerLocal('soundcloud_icon_colors', iconSettings.colors);
                ts.registerLocal('soundcloud_icon_size', iconSettings.size);
                ts.load('embed/icon', function(err, widget) {
                    // Renders the html without HTML-encoding the values
                    cb(null, new pb.TemplateValue(widget, false));
                });

            });
        });
    });

    pb.AdminSubnavService.registerFor('plugin_settings', function(navKey, localization, plugin) {
        if(plugin.uid === 'soundcloud-widget') {
            return [
                {
                    name: 'sc_widget_icon_settings',
                    title: 'Icon settings',
                    icon: 'home',
                    href: '/admin/plugins/soundcloud-widget/settings/icon'
                }
            ];
        }
        return [];
    });

    cb(null, true);
};

/**
 * Called when the application is gracefully shutting down.  No guarantees are
 * provided for how much time will be provided the plugin to shut down.
 *
 * @param cb A callback that must be called upon completion.  cb(err, result).
 * The result is ignored
 */
SoundCloudWidget.onShutdown = function(cb) {
    cb(null, true);
};

//exports
module.exports = SoundCloudWidget;
