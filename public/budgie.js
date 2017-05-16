'use strict';


$(() => {
    // Retrieve cookie value by name
    // https://www.w3schools.com/js/js_cookies.asp
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkLoggedInStatus() {
        const loggedIn = getCookie('budgieLoggedIn');
        const name = getCookie('budgieName');

        if (loggedIn === 'true') {
            $('#name').text(name);
            $('#loggedIn').show();
            $('#loggedOut').hide();
        }
        else {
            $('#loggedIn').hide();
            $('#loggedOut').show();
        }
    }

    function logIn() {
        const username = $('#username').val();
        const password = $('#password').val();
        $.ajax('/api/token', {
            method: 'post',
            headers: {
                Accept: 'application/json, */*'
            },
            contentType: 'application/json',
            data: JSON.stringify({
                username,
                password
            })
        })
        .then(() => {
            checkLoggedInStatus();
        })
        .catch(err => {
            console.log('error', err);
        });
    }

    function logOut() {
        $.ajax('/api/token', {
            method: 'delete',
            headers: {
                Accept: 'application/json, */*'
            }
        })
        .then(() => {
            checkLoggedInStatus();
        })
        .catch(err => {
            console.log('error', err);
        });
    }

    checkLoggedInStatus();
    $('#loginButton').on('click', logIn);
    $('#logoutButton').on('click', logOut);
});
