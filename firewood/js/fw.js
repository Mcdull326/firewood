$(document).ready(function () {
    showSth();
});

function showSth() {
    //��¼��Ĳ˵���ʾ
    $('#user-btn,#menu-on').mouseover(function(event) {
        $('#menu-on').show();
        $('#user-btn').css({ transform: 'translate(-5px, 0)'});
    }).mouseout(function(event) {
        $('#menu-on').hide();
        $('#user-btn').css({transform: 'translate(0, 0)'});
    });

    //��¼����ǳ���ʾ
    var cookieUserName = getCookie("UserName");
    var uname = $('#nav-uname');
    if (cookieUserName.length > 0)
    {
        $('#log-reg').hide();
        $('#nav-user').show();
        uname.text(cookieUserName);
    }
    else {
        $('#log-reg').show();
    }

    //�ǳ�̫���Ļ�...
    if (getCurrentStrWidth(cookieUserName,'14px') > 100) {
        var i = uname.text().length;
        while (getCurrentStrWidth(uname.text() + '...', '14px') >= 100) {
            uname.text(uname.text().substr(0, i));
            i--;
        }
        uname.text(uname.text() + '...');
    }

    //�ж��û���ɫ���Ƿ���ʾ��̨����
    var cookieUserRole = getCookie('UserRole');
    if (cookieUserRole == 'firewoodAdmin' || cookieUserRole == 'Admin') {
        $('#manage').css('display','inline');
    }
    else {
        $('#manage').hide();
    }
}
//��cookie��ȡ�ǳ�
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return "";
}
//�����ǳƵ�ʵ�ʳ���
function getCurrentStrWidth(text, font) {
    var currentObj = $('<pre>').hide().appendTo(document.body);
    $(currentObj).html(text).css('font', font);
    var width = currentObj.width();
    currentObj.remove();
    return width;
}

//==========================================================User Register
function uNamePost() {
    var uName = $('#uName').val();
    var a = "{'uName':'" + uName + "'}";
    $.ajax({
        type: "Post",
        url: "uReg.aspx/uNamePost",
        data: a,
        contentType: "application/json; charset=gb2312",
        dataType: "json",
        beforesend: function () { },
        success: function (data) {
            var result = data.d;
            sthExit(result,'uName');
        },
        error: function (err) {
            alert(err);
        }
    });
}
function uMailPost() {
    var uMail = $('#uMail').val();
    var a = "{'uMail':'" + uMail + "'}";
    $.ajax({
        type: "Post",
        url: "uReg.aspx/uMailPost",
        data: a,
        contentType: "application/json; charset=gb2312",
        dataType: "json",
        beforesend: function () { },
        success: function (data) {
            var result = data.d;
            sthExit(result);
        },
        error: function (err) {
            alert(err);
        }
    });
}

function uCheckPost() {
    var uCheck = $('#uCheck').val();
    var a = "{'uCheck':'" + uCheck + "'}";
    $.ajax({
        type: "Post",
        url: "uReg.aspx/uCheckPost",
        data: a,
        contentType: "application/json; charset=gb2312",
        dataType: "json",
        beforesend: function () { },
        success: function (data) {
            var result = data.d;
            sthExit(result);
        },
        error: function (err) {
            alert(err);
        }
    });
}

function sthExit(data,x) {
    var n = data.split(';');
    var textName = n[0];
    if (n == 1) {
        $('#'+textName+'P').text("");
    }
    else {
        $('#' + textName + 'P').text("�ǳƴ��ڣ�");
        $('#' + textName + '').bind('input propertychange', function () {
            if (x == 'uName') {
                uName = $('#' + textName + '').val();
            }
        });
    }
    /*if (n == "0") {
        $('#uNameP').text("");
    }
    else if (n == "1") {
        $('#uNameP').text("�ǳƴ��ڣ�");
        $('#uName').bind('input propertychange', function () {
            uName = $('#uName').val();
        });
    }
    else if (n == "2") {
        $('#uMailP').text("");
    }
    else if (n == "3") {
        $('#uMailP').text("������ڣ�");
        $('#uMail').bind('input propertychange', function () {
            uMail = $('#uName').val();
        });
    }
    else if (n == "4") {
        $("#uCheckP").text("��֤�����");
        $('#uCheck').bind('input propertychange', function () {
            uCheck = $('#uCheckP').val();
        });
    }
    else if (n == "5") {
        $("#uCheckP").text("");
    }
    else if (n == "6") {
        $("#uCheckP").text("��֤�����ɴ���");
    }*/
}
/*$(function () {
    var uName, uMail, uCheck, pwd, pwd1;

    $('#uName').bind('input propertychange', function () {
        uName = $('#uName').val();
        uNamePost();
    });
    $('#uMail').bind('input propertychange', function () {
        uMail = $('#uMail').val();
        uMailPost();
    });
    $('#uCheck').bind('input propertychange', function () {
        uCheck = $('#uCheck').val();
        uCheckPost();
    });
    $('#pwd1').bind('input propertychange', function () {
        pwd = $('#pwd').val();
        pwd1 = $('#pwd1').val();
        if (pwd != pwd1) {
            $("#uPwdP").text("���벻һ�£�");
        }
        else {
            $("#uPwdP").text("");
        }
    });
});*/