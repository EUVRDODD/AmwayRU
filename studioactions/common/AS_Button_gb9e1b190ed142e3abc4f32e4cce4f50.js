function AS_Button_gb9e1b190ed142e3abc4f32e4cce4f50(eventobject) {
    var self = this;

    function AS_Button_gb9e1b190ed142e3abc4f32e4cce4f50(eventobject) {
        var self = this;

        function MOVE_ACTION____j6d9ddd4435d4766ad9d38204825072c_Callback() {}
        self.view.SideDrawer.animate(
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
            "duration": 0.25,
            "direction": kony.anim.DIRECTION_ALTERNATE
        }, {
            "animationEnd": MOVE_ACTION____j6d9ddd4435d4766ad9d38204825072c_Callback
        });
    }
}