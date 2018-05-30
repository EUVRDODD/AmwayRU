define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_FlexContainer_ccc3c6dc22a347e98621435273a071e5: function AS_FlexContainer_ccc3c6dc22a347e98621435273a071e5(eventobject) {
        var self = this;

        function ___ide_onClick_da871655723f4bedb2967ebb986d92fb_Callback() {
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.lblWebsites["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.lblWebsites["skin"] = "inactiveFilterText";
                })();
            }
            self.view.flxLineWeb["isVisible"] = false;
        }
        function ___ide_onClick_d59673cd6e8c4a7d8742ff103d04d076_Callback() {
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.lblApps["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.lblApps["skin"] = "inactiveFilterText";
                })();
            }
            self.view.flxLineApps["isVisible"] = false;
        }
        function ___ide_onClick_d868760ecdae45878c8c8c4696464c7a_Callback() {
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.lblTools["skin"] = "activeFilterText";
                }, null);
            } else {
                (function() {
                    self.view.lblTools["skin"] = "activeFilterText";
                })();
            }
            self.view.CopyFlexContainer0b4ce95f8ef1941["isVisible"] = true;
        }
        self.view.filterContent3.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0px",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
        }, {
            "animationEnd": ___ide_onClick_d868760ecdae45878c8c8c4696464c7a_Callback
        });
        self.view.filterContent1.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "-200%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
        }, {
            "animationEnd": ___ide_onClick_d59673cd6e8c4a7d8742ff103d04d076_Callback
        });
        self.view.filterContent2.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "-100%",
                "stepConfig": {
                    "timingFunction": kony.anim.EASE
                }
            }
        }), {
            "delay": 0,
            "iterationCount": 1,
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.25
        }, {
            "animationEnd": ___ide_onClick_da871655723f4bedb2967ebb986d92fb_Callback
        });
    }
});