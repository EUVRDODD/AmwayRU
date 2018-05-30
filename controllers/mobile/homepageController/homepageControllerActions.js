define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    AS_FlexContainer_f16185bd7064470bacd1c758cb501e68: function AS_FlexContainer_f16185bd7064470bacd1c758cb501e68(eventobject) {
        var self = this;

        function MOVE_ACTION____e616114f64914f7e84de3b863cdde584_Callback() {
            self.view.FlexContainer0d253777f93d541["isVisible"] = false;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0f521188d9de748["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0f521188d9de748["skin"] = "inactiveFilterText";
                })();
            }
        }
        function MOVE_ACTION____g06ec1cc0af340ab9a374f6e66870158_Callback() {
            self.view.FlexContainer0b808e5aba8e24a["isVisible"] = false;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0i9c8316b5ae546["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0i9c8316b5ae546["skin"] = "inactiveFilterText";
                })();
            }
        }
        function MOVE_ACTION____ab9573b7cf784399909bb0532dabcb53_Callback() {
            self.view.FlexContainer0h97a80d06a1649["isVisible"] = false;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0bf96dbcab90c45["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0bf96dbcab90c45["skin"] = "inactiveFilterText";
                })();
            }
        }
        function MOVE_ACTION____g105642d0ae34c3bb8e236a88781c142_Callback() {
            self.view.FlexContainer0f85f9258edf74b["isVisible"] = true;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0fab43895ea4548["skin"] = "activeFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0fab43895ea4548["skin"] = "activeFilterText";
                })();
            }
        }
        self.view.flxTab1Content.animate(
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
            "animationEnd": MOVE_ACTION____g105642d0ae34c3bb8e236a88781c142_Callback
        });
        self.view.flxTab2Content.animate(
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
            "animationEnd": MOVE_ACTION____ab9573b7cf784399909bb0532dabcb53_Callback
        });
        self.view.flxTab3Content.animate(
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
            "animationEnd": MOVE_ACTION____g06ec1cc0af340ab9a374f6e66870158_Callback
        });
        self.view.flxTab4Content.animate(
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
            "animationEnd": MOVE_ACTION____e616114f64914f7e84de3b863cdde584_Callback
        });
    },
    AS_FlexContainer_a46c2c0a6024468483655525cb4caae9: function AS_FlexContainer_a46c2c0a6024468483655525cb4caae9(eventobject) {
        var self = this;

        function MOVE_ACTION____ibd5b6567e4b4c43a573bed879daf72e_Callback() {
            self.view.FlexContainer0b808e5aba8e24a["isVisible"] = false;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0i9c8316b5ae546["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0i9c8316b5ae546["skin"] = "inactiveFilterText";
                })();
            }
        }
        function MOVE_ACTION____a7c506d068a542859fca992e7697ae11_Callback() {
            self.view.FlexContainer0d253777f93d541["isVisible"] = false;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0f521188d9de748["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0f521188d9de748["skin"] = "inactiveFilterText";
                })();
            }
        }
        function MOVE_ACTION____de4b7b0548b043b1ae27f043e4698ed3_Callback() {
            self.view.FlexContainer0f85f9258edf74b["isVisible"] = false;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0fab43895ea4548["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0fab43895ea4548["skin"] = "inactiveFilterText";
                })();
            }
        }
        function MOVE_ACTION____fac9d4c33ba94956848868261378df15_Callback() {
            self.view.FlexContainer0h97a80d06a1649["isVisible"] = true;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0bf96dbcab90c45["skin"] = "activeFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0bf96dbcab90c45["skin"] = "activeFilterText";
                })();
            }
        }
        self.view.flxTab2Content.animate(
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
            "animationEnd": MOVE_ACTION____fac9d4c33ba94956848868261378df15_Callback
        });
        self.view.flxTab1Content.animate(
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
            "animationEnd": MOVE_ACTION____de4b7b0548b043b1ae27f043e4698ed3_Callback
        });
        self.view.flxTab4Content.animate(
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
            "animationEnd": MOVE_ACTION____a7c506d068a542859fca992e7697ae11_Callback
        });
        self.view.flxTab3Content.animate(
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
            "animationEnd": MOVE_ACTION____ibd5b6567e4b4c43a573bed879daf72e_Callback
        });
    },
    AS_FlexContainer_i8669cf914e5482fa8d75295afc5f095: function AS_FlexContainer_i8669cf914e5482fa8d75295afc5f095(eventobject) {
        var self = this;

        function MOVE_ACTION____f2b0cd1237274bc786a270d445d7b4cc_Callback() {
            self.view.FlexContainer0d253777f93d541["isVisible"] = false;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0f521188d9de748["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0f521188d9de748["skin"] = "inactiveFilterText";
                })();
            }
        }
        function MOVE_ACTION____bfe74b6c55d6431b9fdbde415e5b3cbc_Callback() {
            self.view.FlexContainer0h97a80d06a1649["isVisible"] = false;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0bf96dbcab90c45["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0bf96dbcab90c45["skin"] = "inactiveFilterText";
                })();
            }
        }
        function MOVE_ACTION____c9af5d74aa91476e9b3c81e74b0792c6_Callback() {
            self.view.FlexContainer0f85f9258edf74b["isVisible"] = false;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0fab43895ea4548["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0fab43895ea4548["skin"] = "inactiveFilterText";
                })();
            }
        }
        function MOVE_ACTION____g3ac1f4621674a8992b715045600de57_Callback() {
            self.view.FlexContainer0b808e5aba8e24a["isVisible"] = true;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0i9c8316b5ae546["skin"] = "activeFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0i9c8316b5ae546["skin"] = "activeFilterText";
                })();
            }
        }
        self.view.flxTab3Content.animate(
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
            "animationEnd": MOVE_ACTION____g3ac1f4621674a8992b715045600de57_Callback
        });
        self.view.flxTab1Content.animate(
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
            "animationEnd": MOVE_ACTION____c9af5d74aa91476e9b3c81e74b0792c6_Callback
        });
        self.view.flxTab2Content.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "-100dp",
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
            "animationEnd": MOVE_ACTION____bfe74b6c55d6431b9fdbde415e5b3cbc_Callback
        });
        self.view.flxTab4Content.animate(
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
            "animationEnd": MOVE_ACTION____f2b0cd1237274bc786a270d445d7b4cc_Callback
        });
    },
    AS_FlexContainer_h43d61f126fa4c5499a77b422cb2af20: function AS_FlexContainer_h43d61f126fa4c5499a77b422cb2af20(eventobject) {
        var self = this;

        function MOVE_ACTION____e66bedba6cb94a9f932645fab4b24371_Callback() {
            self.view.FlexContainer0b808e5aba8e24a["isVisible"] = false;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0i9c8316b5ae546["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0i9c8316b5ae546["skin"] = "inactiveFilterText";
                })();
            }
        }
        function MOVE_ACTION____i3fe0233314149dea8799971651c32cb_Callback() {
            self.view.FlexContainer0h97a80d06a1649["isVisible"] = false;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0bf96dbcab90c45["skin"] = "activeFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0bf96dbcab90c45["skin"] = "activeFilterText";
                })();
            }
        }
        function MOVE_ACTION____f2fa6c9999d44d37870ef393150d2b96_Callback() {
            self.view.FlexContainer0f85f9258edf74b["isVisible"] = false;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0fab43895ea4548["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0fab43895ea4548["skin"] = "inactiveFilterText";
                })();
            }
        }
        function MOVE_ACTION____efcb1353fdf046cbbc773b7a72a55014_Callback() {
            self.view.FlexContainer0d253777f93d541["isVisible"] = true;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0f521188d9de748["skin"] = "activeFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0f521188d9de748["skin"] = "activeFilterText";
                })();
            }
        }
        self.view.flxTab4Content.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "0%",
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
            "animationEnd": MOVE_ACTION____efcb1353fdf046cbbc773b7a72a55014_Callback
        });
        self.view.flxTab1Content.animate(
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
            "animationEnd": MOVE_ACTION____f2fa6c9999d44d37870ef393150d2b96_Callback
        });
        self.view.flxTab2Content.animate(
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
            "animationEnd": MOVE_ACTION____i3fe0233314149dea8799971651c32cb_Callback
        });
        self.view.flxTab3Content.animate(
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
            "animationEnd": MOVE_ACTION____e66bedba6cb94a9f932645fab4b24371_Callback
        });
    },
    AS_FlexContainer_j7df234a59994a6b9930a677ef1a4674: function AS_FlexContainer_j7df234a59994a6b9930a677ef1a4674(eventobject) {
        var self = this;

        function ___ide_onClick_c65f462401d14ab590487e2bd1fc6769_Callback() {
            self.view.FlexContainer0d253777f93d541["isVisible"] = false;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0f521188d9de748["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0f521188d9de748["skin"] = "inactiveFilterText";
                })();
            }
        }
        function ___ide_onClick_j2d0a702242d4ee0bbb70efab76184a1_Callback() {
            self.view.FlexContainer0h97a80d06a1649["isVisible"] = false;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0bf96dbcab90c45["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0bf96dbcab90c45["skin"] = "inactiveFilterText";
                })();
            }
        }
        function ___ide_onClick_haaabf3d02e8458988c4f50a7db6a855_Callback() {
            self.view.FlexContainer0f85f9258edf74b["isVisible"] = false;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0fab43895ea4548["skin"] = "inactiveFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0fab43895ea4548["skin"] = "inactiveFilterText";
                })();
            }
        }
        function ___ide_onClick_e75f02363b584e1fa08601f831b50409_Callback() {
            self.view.FlexContainer0b808e5aba8e24a["isVisible"] = true;
            if (kony.theme.getCurrentTheme() != "default") {
                kony.theme.setCurrentTheme("default", function() {
                    self.view.Label0i9c8316b5ae546["skin"] = "activeFilterText";
                }, null);
            } else {
                (function() {
                    self.view.Label0i9c8316b5ae546["skin"] = "activeFilterText";
                })();
            }
        }
        self.view.flxTab3Content.animate(
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
            "animationEnd": ___ide_onClick_e75f02363b584e1fa08601f831b50409_Callback
        });
        self.view.flxTab1Content.animate(
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
            "animationEnd": ___ide_onClick_haaabf3d02e8458988c4f50a7db6a855_Callback
        });
        self.view.flxTab2Content.animate(
        kony.ui.createAnimation({
            "100": {
                "left": "-100dp",
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
            "animationEnd": ___ide_onClick_j2d0a702242d4ee0bbb70efab76184a1_Callback
        });
        self.view.flxTab4Content.animate(
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
            "animationEnd": ___ide_onClick_c65f462401d14ab590487e2bd1fc6769_Callback
        });
    }
});