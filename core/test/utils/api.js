var url = require('url'),
    moment= require('moment'),
    ApiRouteBase = '/ghost/api/v0.1/',
    host = 'localhost',
    port = '2369',
    schema = 'http://',
    expectedProperties = {
        posts: ['posts', 'meta'],
        users: ['users'],
        pagination: ['page', 'limit', 'pages', 'total', 'next', 'prev'],
        post: ['id', 'uuid', 'title', 'slug', 'markdown', 'html', 'meta_title', 'meta_description',
            'featured', 'image', 'status', 'language', 'created_at', 'created_by', 'updated_at',
            'updated_by', 'published_at', 'published_by', 'page', 'author', 'tags', 'fields'],
        settings: ['settings', 'meta'],
        setting: ['id', 'uuid', 'key', 'value', 'type', 'created_at', 'created_by', 'updated_at', 'updated_by'],
        tag: ['id', 'uuid', 'name', 'slug', 'description', 'parent', 'image', 'hidden',
            'meta_title', 'meta_description', 'created_at', 'created_by', 'updated_at', 'updated_by'],
        theme: ['uuid', 'name', 'version', 'active'],
        user: ['id', 'uuid', 'name', 'slug', 'email', 'image', 'cover', 'bio', 'website',
            'location', 'accessibility', 'status', 'language', 'meta_title', 'meta_description', 'last_login',
            'created_at', 'created_by',  'updated_at', 'updated_by'],
        notification: ['type', 'message', 'status', 'id', 'dismissible', 'location'],
        slugs: ['slugs'],
        slug: ['slug'],
        accesstoken: ['access_token', 'refresh_token', 'expires_in', 'token_type'],
        role: ['id', 'uuid', 'name', 'description', 'created_at', 'created_by', 'updated_at', 'updated_by'],
        permission: ['id', 'uuid', 'name', 'object_type', 'action_type', 'object_id', 'created_at', 'created_by',
            'updated_at', 'updated_by']
    };

function getApiQuery(route) {
    return url.resolve(ApiRouteBase, route);
}

function getApiURL(route) {
    var baseURL = url.resolve(schema + host + ':' + port, ApiRouteBase);
    return url.resolve(baseURL, route);
}
function getSigninURL() {
    return url.resolve(schema + host + ':' + port, 'ghost/signin/');
}
function getAdminURL() {
    return url.resolve(schema + host + ':' + port, 'ghost/');
}

// make sure the API only returns expected properties only
function checkResponseValue(jsonResponse, properties) {
    Object.keys(jsonResponse).length.should.eql(properties.length);
    for (var i = 0; i < properties.length; i = i + 1) {
        // For some reason, settings response objects do not have the 'hasOwnProperty' method
        if (Object.prototype.hasOwnProperty.call(jsonResponse, properties[i])) {
            continue;
        }
        jsonResponse.should.have.property(properties[i]);
    }
}

function checkResponse(jsonResponse, objectType, additionalProperties) {
    var checkProperties = expectedProperties[objectType];
    checkProperties = additionalProperties ? checkProperties.concat(additionalProperties) : checkProperties;

    checkResponseValue(jsonResponse, checkProperties);
}

function isISO8601(date) {
    return moment(date).parsingFlags().iso;
}

module.exports = {
    getApiURL: getApiURL,
    getApiQuery: getApiQuery,
    getSigninURL: getSigninURL,
    getAdminURL: getAdminURL,
    checkResponse: checkResponse,
    checkResponseValue: checkResponseValue,
    isISO8601: isISO8601
};
