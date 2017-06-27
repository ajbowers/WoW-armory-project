import apiConfig from '../config.json';
let api = apiConfig.api;
/**
 *  Helper utility to build API from different parameters
 */
export function buildUrl(name, path, fields, realm) {
    var api_root = api.apiRoot;
    var locale = api.apiLocaleString;
    var key = api.apiKey;
    var apiUrl = api_root + path + realm + "/" + name + fields + "&" + locale + "&apikey=" + key;
    return apiUrl;
}

export function generateFieldsString(fields) {
    let _fields = '?fields=';
    if (fields.length > 1) {
        for (var i = 0; i < fields.length - 1; i++) {
            _fields += fields[i] + "%2C";
        }
        _fields += fields[fields.length - 1];
    } else {
        _fields += fields[0];
    }
    return _fields;
}

export function determineApiCall(type, realm, guild_name, character_name, fields) {
    let path = '';
    let _fields = generateFieldsString(fields);
    if (type === 'character') {
        path = api.apiCharacterPath;
        return buildUrl(character_name, path, _fields, realm);
    } else if (type === 'guild') {
        path = api.apiGuildPath;
        return buildUrl(guild_name, path, _fields, realm);
    }
}