define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_FlexContainer_hba8dfc5160f4aefa79f612c0eacc604: function AS_FlexContainer_hba8dfc5160f4aefa79f612c0eacc604(eventobject) {
        var self = this;

        function MOVE_ACTION____f79fd3004f324a00b4d772e0c8e233bf_Callback() {
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
        function MOVE_ACTION____b0dd58336e754dc49a164fe79ea8bda3_Callback() {
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
        function MOVE_ACTION____i327b911272f45c6b2c4406a6b959008_Callback() {
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
            "animationEnd": MOVE_ACTION____i327b911272f45c6b2c4406a6b959008_Callback
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
            "animationEnd": MOVE_ACTION____b0dd58336e754dc49a164fe79ea8bda3_Callback
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
            "animationEnd": MOVE_ACTION____f79fd3004f324a00b4d772e0c8e233bf_Callback
        });
    }
});