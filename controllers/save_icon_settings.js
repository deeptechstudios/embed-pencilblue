/**
 * Created by Daniel on 2/18/2015.
 */

function SaveIconSettings() {}

// inheritance
util.inherits(SaveIconSettings, pb.BaseController);

SaveIconSettings.prototype.render = function(cb) {
    var self = this;

    this.getJSONPostParams(function(err, post) {
        delete post._id;

        var opts = {
            where: { settings_type: 'icon_settings' }
        };
        var dao = new pb.DAO();
        dao.q('sc_widget_settings', opts, function(err, iconSettings) {
            if (util.isError(err)) {
                return self.reqHandler.serveError(err);
            }
            if(iconSettings.length > 0) {
                iconSettings = iconSettings[0];
                pb.DocumentCreator.update(post, iconSettings);
            }
            else {
                iconSettings = pb.DocumentCreator.create('sc_widget_settings', post);
                iconSettings.settings_type = 'icon_settings';
            }

            dao.save(iconSettings, function(err, result) {
                if(util.isError(err))  {
                    cb({
                        code: 500,
                        content: pb.BaseController.apiResponse(pb.BaseController.API_FAILURE, self.ls.get('ERROR_SAVING'), result)
                    });
                    return;
                }

                cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, self.ls.get('ICON_SETTINGS') + ' ' + self.ls.get('SAVED'))});
            });
        });
    });
};

SaveIconSettings.getRoutes = function(cb) {
    var routes = [
        {
            method: 'post',
            path: '/actions/admin/plugins/soundcloud-widget/settings/icon',
            auth_required: true,
            access_level: ACCESS_EDITOR,
            content_type: 'text/html'
        }
    ];
    cb(null, routes);
};

//exports
module.exports = SaveIconSettings;