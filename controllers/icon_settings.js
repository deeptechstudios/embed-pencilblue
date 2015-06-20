/**
 * Created by Daniel on 2/18/2015.
 */

function IconSettings(){}

// dependencies
var PluginService = pb.PluginService;

// inheritance
util.inherits(IconSettings, pb.BaseController);

IconSettings.prototype.render = function(cb) {
    var self = this;

    // Not for anything?
    var response = {
        content_type: "text/html",
        code: 200
    };

    var tabs = [
        {
            active: 'active',
            href: '#icon_settings',
            icon: 'home',
            title: self.ls.get('ICON_SETTINGS')
        }
    ];

    var pills = [
    {
        name: 'content_settings',
        title: self.ls.get('ICON_SETTINGS'),
        icon: 'chevron-left',
        href: '/admin/plugins/soundcloud-widget/settings'
    }];

    var opts = {
        where: { settings_type: 'icon_settings' }
    };

    var dao  = new pb.DAO();
    dao.q('sc_widget_settings', opts, function(err, iconSettings) {
        if (iconSettings.length > 0) {
            iconSettings = iconSettings[0];
        }
        else {
            iconSettings = {
                colors: 'orange_white',
                size: 32
            }
        }

        var objects = {
            navigation: pb.AdminNavigation.get(self.session, ['plugins', 'manage'], self.ls),
            tabs: tabs,
            pills: pills,
            iconSettings: iconSettings
        };

        self.ts.registerLocal('angular_objects', new pb.TemplateValue(pb.js.getAngularObjects(objects), false));
        self.ts.load('admin/settings/icon_settings', function(err, result) {
            cb({content: result});
        });
    });
};

IconSettings.getRoutes = function(cb) {
    var routes = [
        {
            method: 'get',
            path: '/admin/plugins/soundcloud-widget/settings/icon',
            auth_required: true,
            access_level: ACCESS_EDITOR,
            content_type: 'text/html'
        }
    ];
    cb(null, routes);
};

// exports
module.exports = IconSettings;