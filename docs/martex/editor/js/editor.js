/// @name libEditor
/// @version 1.0.0
/// @author Thijs Miedema

var libEditor = (function () {
    var me = {
    };

    me.load = function () {
        me.dragbar = $("#dragbar");
        me.menucol = $("#leftcol");
        me.editorcol = $("#midcol");
        me.editorelm = $("#editor");
        me.formelm = $("#formelm");
        me.outputcol = $("#rightcol");
        me.document = $(document);
        me.lmin = me.menucol.width();

        me.dragbar.mousedown(function (e) {
            e.preventDefault();

            // dragbar follows mouse
            $(document).mousemove(function (e) {
                me.lmin = me.menucol.width();
                if (e.pageX > me.lmin - 1) {
                    me.editorcol.css("width", e.pageX + 2 - me.lmin);
                    me.outputcol.css("left", e.pageX + 2);
                }
            });
        });

        // recalculate on page resize
        $(window).resize(function () {
            me.lmin = me.menucol.width();
            me.outputcol.css("left", me.editorcol.width() + me.menucol.width());
        });

        // stop following mouse
        me.document.mouseup(function (e) {
            me.document.unbind("mousemove");
        });

        me.aceload();
    };

    me.aceload = function () {
        me.editor = ace.edit("editor");
        me.editor.setTheme("ace/theme/dawn");
        me.editor.session.setMode("ace/mode/tex");
        me.editor.session.setUseWrapMode(true);

        me.editor.on("change", function (e) {
            var out = Module._compile("\\begin{document} " + me.editor.getValue() + " \\end{document}");
            me.outputcol.html(out);
        });
    };

    return me;
}());
