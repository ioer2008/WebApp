// This file is to show how a library package may provide JavaScript interop features
// wrapped in a .NET API
$.fn.editable.defaults.mode = 'inline';

window.JsFunctions = {
    showPrompt: function (message) {
        return prompt(message, 'Type anything here');
    },
    run: function (code) {
        console.log(code);
        eval(code);
    },
    reload: function () {
        location.reload();
    },
    toastr: function (state, message, code) {
        eval("toastr." + state + "('" + message + "');");

        if (code.length > 0) {
            return setTimeout(function () {
                window.JsFunctions.run(code);
            }, 1000);
        }
    },
    saveAsFile: function (filename, bytesBase64) {
        var link = document.createElement('a');
        link.download = filename;
        link.target = "_blank";
        link.href = "data:application/octet-stream;base64," + bytesBase64;
        document.body.appendChild(link); // Needed for Firefox
        link.click();
        document.body.removeChild(link);
    },
    ueditor_init: function (id, dotNetReference) {
        try {
            var editor = UE.getEditor(id);

            editor.addListener("contentChange", function () {
                dotNetReference.invokeMethodAsync('EditorDataChanged', editor.getContent());
                //console.log('内容改变:' + editor.getContent());
            });
        } catch (e) {
            console.log('error:' + e.message);
        }
    },
    //导出excel
    tableExport: function (id, title) {
        $(id).table2excel({
            // exclude CSS class
            exclude: ".noExl",
            name: title,
            filename: title,
            exclude_img: true,
            exclude_links: true,
            exclude_inputs: true
        });
    },
    //价格日历初始化
    calendarInit: function (id, url) {
        $('#' + id).fullCalendar({
            header: {
                left: 'month',
                center: 'title',
                right: 'prev,next today'
            }, 
            locale: 'zh-cn',
            editable: false,
            eventLimit: true,
            navLinks: false,
            events: {
                url: url,
                data: {},
                cache: false,
                method: 'get'
            },
        });
    }
};