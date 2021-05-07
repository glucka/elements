var _iub = _iub || [];
_iub.csConfiguration = {
    cookiePolicyId: 0,
    siteId: 0,
    lang: lang,
    countryDetection: true,
    perPurposeConsent: true,
    consentOnScrollHorizontal: true,
    consentOnDocument: true,
    rebuildIframe: false,
    banner: {
        brandBackgroundColor: '#ffffff',
        brandTextColor: '#404040',
        "acceptButtonDisplay": true,
        "position": "top",
        "prependOnBody": false,
        "customizeButtonDisplay": true,
        "rejectButtonDisplay": true,
        "applyStyles": false,
        logo: window.location.origin+'/fileadmin/user_upload/Template/login_logo.svg',
    },
    callback: {
        onPreferenceExpressedOrNotNeeded: function (preference) {
            dataLayer.push({
                iubenda_ccpa_opted_out: _iub.cs.api.isCcpaOptedOut()
            });
            if (!preference) {
                dataLayer.push({
                    event: "iubenda_preference_not_needed"
                });
            } else {
                if (preference.consent === true) {
                    dataLayer.push({
                        event: "iubenda_consent_given"
                    });
                } else if (preference.consent === false) {
                    dataLayer.push({
                        event: "iubenda_consent_rejected"
                    });
                } else if (preference.purposes) {
                    for (var purposeId in preference.purposes) {
                        if (preference.purposes[purposeId]) {
                            dataLayer.push({
                                event: "iubenda_consent_given_purpose_" + purposeId
                            });
                        }
                    }
                }
            }
        }
    }
};