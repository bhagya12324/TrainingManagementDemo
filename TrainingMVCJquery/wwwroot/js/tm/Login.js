console.log("hi Login.js");
var Login = (function () {

	var Init = function () {
        _LoginButtonClickHandler()
	};

    function _LoginButtonClickHandler() {
        var $progressIndicator = $('#login-progress-indicator');
        var $main = $('#main');
        $progressIndicator.addClass('in-progress');
        $main.addClass('in-progress')
        var username = $("#email").val();
        var password = $("#password").val();
        $.ajax({
            type: 'POST',
            async: true,
            url: 'http://localhost:5117/api/user/login',
            headers: { 'Authorization': 'Basic ' },
            data: JSON.stringify({ email: username, password: password }),
            success: function (token) {
                $progressIndicator.removeClass('in-progress');
                localStorage.setItem("jwtToken", token);
                console.log(token);

                var jwtToken = '';
                jwtToken = localStorage.getItem("jwtToken");
                //var jwtToken = document.cookie;
                console.info(jwtToken);

                if (jwtToken.length != 0) {
                    window.location.href = '/Home/Index';
                }
                else {
                    alert("Invalid Username or Password");
                    $main.removeClass('in-progress');

                }

            },
            error: async function (error) {
                $progressIndicator.removeClass('in-progress');
                $main.removeClass('in-progress');

                alert(error);
            },
            contentType: "application/json",

        });
        var jwtToken = '';
        jwtToken = localStorage.getItem("jwtToken");
        //var jwtToken = document.cookie;
        console.info(jwtToken);
    }
	return {
		Init: Init
	};
})();






function Log() {
    console.log("jQuery")
    Login.Init();
}