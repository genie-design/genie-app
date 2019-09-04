var dataService = require('./data.service');
var helperService = require('./helper.service');
var eventBusService = require('./event-bus.service');

var fs = require('fs');
const cheerio = require('cheerio')
const axios = require('axios');
const ShortcodeTree = require('shortcode-tree').ShortcodeTree;
const chalk = require('chalk');
const log = console.log;



module.exports = siteSettingsService = {

    startup: async function () {
        console.log('>>=== site setting startup');

        eventBusService.on('getRenderedPagePostDataFetch', async function (req, page) {
            console.log('>>=== site setting executing');
            await siteSettingsService.processSiteSettings(page);

        });
    },

    processSiteSettings: async function (page) {
        var siteSettings =  await dataService.getContentTopOne('site-settings');
        page.data.siteSettings = siteSettings;
    }
}