/*  Author: Yunus SARIBULUT
 *  This Component doesn't need any Javascript library or framework.
 *  You can dynamically change and add your ads.
 *  This js only needs Config.json file path
 *  Example ad element = <gad data-ad="970x90"></gad>
 *  Example Custom Ad Element = <gad data-ad="970x90" data-custom="true"></gad> -> 970x90 is width and height here
 *  You can give data-slot attribute for a custom Slot Id <gad data-ad="970x90" data-slot="234981983"></gad>
 *  Example AmpAd element = <gad data-ad="AmpHtml" width="320" height="100"></gad>
 * */
var GoogleAdCustom = {
    Config: {
        Pub: "ca-pub-8229496574777654",
        Script: "<script async src='//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>",
        Html: "<ins class='adsbygoogle' style='{style}' data-ad-client='{pub}' data-ad-slot='{slot}' {customAttribute}></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>",
        AmpHtml: "<amp-ad width={ampWidth} height={ampHeight} type='adsense' data-ad-client='{pub}'></amp-ad>",
        PageLevelAdHtml: "<script>(adsbygoogle = window.adsbygoogle || []).push({google_ad_client: '{pub}',enable_page_level_ads: true});</script>",
        DefaultStyle: "display:block",
        SizedStyle: "display:inline-block;width:{ssWidth}px;height:{ssHeight}px"
    },
    Ads: {
        MatchedContent: {
            DefaultStyle: true,
            Slot: '',
            CustomAttribute: ''
        },
        InFeed: {
            DefaultStyle: true,
            Slot: '',
            CustomAttribute: ''
        },
        Responsive: {
            DefaultStyle: true,
            Slot: '',
            CustomAttribute: ''
        },
        AutomaticLink: {
            DefaultStyle: true,
            Slot: '',
            CustomAttribute: "data-ad-format='link'"
        },
        _970x90: {
            DefaultStyle: false,
            Slot: '',
            CustomAttribute: ''
        },
        _728x90: {
            DefaultStyle: false,
            Slot: '',
            CustomAttribute: ''
        },
        _336x280: {
            DefaultStyle: false,
            Slot: '',
            CustomAttribute: ''
        },
        _300x250: {
            DefaultStyle: false,
            Slot: '',
            CustomAttribute: ''
        },
        _300x600: {
            DefaultStyle: false,
            Slot: '',
            CustomAttribute: ''
        },
        _200x90: {
            DefaultStyle: false,
            Slot: '',
            CustomAttribute: ''
        },
        _320x100: {
            DefaultStyle: false,
            Slot: '',
            CustomAttribute: ''
        },
        _468x60: {
            DefaultStyle: false,
            Slot: '',
            CustomAttribute: ''
        }
    },
    _adTag: 'gad',
    _adAttr: 'data-ad',
    _customAdAttr: 'data-custom',
    _slotAdAttr: 'data-slot',

    Init: function () {
        var configRes = JSON.stringify(this.Config);
        this.Config = JSON.parse(configRes.replace(/{pub}/g, this.Config.Pub));

        this._SetAds();
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
            var slotGiven = element.getAttribute(this._slotAdAttr);
            var adJson = adType.indexOf('x') > -1 ? ads['_' + adType] : ads[adType];

            if (isCustom) {
                adJson = {
                    DefaultStyle: false,
                    Slot: '',
                    CustomAttribute: ''
                };
            }

            if (slotGiven) {
                adJson.Slot = slotGiven;
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

GoogleAdCustom.Init();