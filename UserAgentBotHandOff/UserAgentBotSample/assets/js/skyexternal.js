var skyExtObject = (function () {
    //this variable represents the total number of popups can be displayed according to the viewport width
    var total_popups = 0;

    //arrays of popups ids
    var popups = [];
    //this function can remove a array element.
    Array.remove = function (array, from, to) {
        var rest = array.slice((to || from) + 1 || array.length);
        array.length = from < 0 ? array.length + from : from;
        return array.push.apply(array, rest);
    }

    return {
        /*
        func1: function () {
            alert('function 1 called');
        },
        func2: function () {
            alert('function 2 called');
        },*/

        //this is used to close a popup
        close_popup: function close_popup(id) {
            for (var iii = 0; iii < popups.length; iii++) {
                if (id == popups[iii]) {
                    Array.remove(popups, iii);
                    document.getElementById(id).style.display = "none";
                    this.calculate_popups();

                    return;
                }
            }
        },

        //displays the popups. Displays based on the maximum number of popups that can be displayed on the current viewport width
        display_popups: function display_popups() {
            var right = 220;

            var iii = 0;
            for (iii; iii < total_popups; iii++) {
                if (popups[iii] != undefined) {
                    var element = document.getElementById(popups[iii]);
                    element.style.right = right + "px";
                    right = right + 320;
                    element.style.display = "block";
                }
            }

            for (var jjj = iii; jjj < popups.length; jjj++) {
                var element = document.getElementById(popups[jjj]);
                element.style.display = "none";
            }
        },

        //creates markup for a new popup. Adds the id to popups array.
        register_popup: function register_popup(id, name) {
            for (var iii = 0; iii < popups.length; iii++) {
                //already registered. Bring it to front.
                if (id == popups[iii]) {
                    Array.remove(popups, iii);
                    popups.unshift(id);
                    this.calculate_popups();
                    return;
                }
            }
            var element = '<div class="popup-box chat-popup" id="' + id + '">';
            element = element + '<div class="popup-head">';
            element = element + '<div class="popup-head-left">' + name + '</div>';
            element = element + '<div class="popup-head-right"><a onclick="skyExtObject.close_popup(\'' + id + '\')">&#10005;</a></div>';
            element = element + '<div style="clear: both"></div>Command for channel aggregation:<br/> <b>command watch</b> <br/><textarea style="width:100%;">command accept ' + id + '</textarea><br/></div><div class="popup-messages">';
            element = element + '<iframe src="https://webchat.botframework.com/embed/useragentbot_FhIXuWlwjYT?s=35uCpBpXgwo.cwA.0gA.kzVegkk4SVcoWttR2HAVx9-VGU8wyxB93FTTlrlsq9U&userId=E2LVkp79VXo&userName=AgentSky" width="300" height="360" /></div></div>';
            document.getElementById("bot-container").innerHTML = document.getElementById("bot-container").innerHTML + element;

            popups.unshift(id);
            this.calculate_popups();

        },

        //calculate the total number of popups suitable and then populate the toatal_popups variable.
        calculate_popups: function calculate_popups() {
            var width = window.innerWidth;
            if (width < 540) {
                total_popups = 0;
            }
            else {
                width = width - 200;
                //320 is width of a single popup box
                total_popups = parseInt(width / 320);
            }
            this.display_popups();
        },
    }

    //recalculate when window is loaded and also when window is resized.
    window.addEventListener("resize", this.calculate_popups);
    window.addEventListener("load", this.calculate_popups);


})(skyExtObject || {})