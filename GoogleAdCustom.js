/*  Author: Yunus SARIBULUT
 *  This Component doesn't need any Javascript library or framework.
 *  You can dynamically change and add your ads.
 *  This js only needs Config.json file path
 *  Example ad element = <gad data-ad="970x90"></gad>
 *  Example Custom Ad Element = <gad data-ad="970x90" data-custom="true"></gad> -> 970x90 is width and height here
 *  Example AmpAd element = <gad data-ad="AmpHtml" width="320" height="100"></gad>
 * */
var GoogleAdCustom = {
    ConfigFile:'',
    Config:null,
    Ads: null,
    _adTag: 'gad',
    _adAttr: 'data-ad',
    _customAdAttr: 'data-custom',

    Init: function (configFile) {
        this.ConfigFile = configFile;
        this._GetJson();
    },

    //Gets Config Json
    _GetJson: function (requested, res) {
        if (requested === true)
        {
            var json = JSON.parse(res);
            json = JSON.parse(res.replace(/{pub}/g, json.Config.Pub));

            this.Config = json.Config;
            this.Ads = json.Ads;
            this._SetAds();
        }
        else
            this._MakeAjaxRequest(this.ConfigFile);
    },
    //Makes Ajax Request without Jquery
    _MakeAjaxRequest: function (url) {
        var comp = this;
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                comp._GetJson(true, xmlhttp.response);
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    },

    _MakeElement: function (htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild; 
    },

    _SetAds: function () {
        var config = this.Config;
        var ads = this.Ads;

        //Gets Ad elements with _adTag TagName
        var adElements = document.getElementsByTagName(this._adTag);
        for (var i = 0; i < adElements.length; i++) {
            var el = adElements[i];
            var adType = el.getAttribute(this._adAttr);

            if (adType != "") {
                this.InsertAd(el, adType);
            }
        }

        //Adds AdsByGoogle.js file into Head element
        this.AddGoogleScriptToHead(config);
    },

    InsertAd: function (element, adType) {
        var ad = this.GetAd(element, adType);
        var adNode = document.createElement('div');
        adNode.innerHTML = ad;

        element.parentNode.replaceChild(adNode, element);
    },

    AddGoogleScriptToHead: function (config) {
        var script = this._MakeElement(config.Script);
        document.getElementsByTagName('head')[0].appendChild(script);
    },

    GetAd: function (element, adType) {
        var ad = '';
        var config = this.Config;
        var ads = this.Ads;

        if (adType === 'AmpHtml') {
            var width = element.getAttribute('data-width');
            var height = element.getAttribute('data-height');
            ad = config.AmpHtml.replace('{ampWidth}', width)
                .replace('{ampHeight}', height);
        }
        else if (adType === 'PageLevel') {
            ad = config.PageLevelAdHtml;
        }
        else {
            var isCustom = element.getAttribute(this._customAdAttr);
            var adJson = ads[adType];

            if (isCustom) {
                console.log('bu custom haci')
                adJson = {
                    DefaultStyle: false,
                    Slot: '',
                    CustomAttribute: ''
                };
            }
            

            if (adJson) {
                ad = config.Html;
                var style = config.DefaultStyle;

                if (adJson.DefaultStyle === false) {
                    var width = adType.split('x')[0];
                    var height = adType.split('x')[1];
                    style = config.SizedStyle.replace('{ssWidth}', width)
                            .replace('{ssHeight}', height);
                }

                var slot = adJson.Slot;
                var customAttribute = adJson.CustomAttribute;

                ad = ad.replace('{style}', style)
                    .replace('{slot}', slot)
                    .replace('{customAttribute}', customAttribute);
            }
        }

        return ad;
    }
}

GoogleAdCustom.Init('/js/GoogleAdCustom/Config.json');