var params, rewriteUrl, $a, i, _href;
params = window.location.search;
$a = $("a.rewrite-url");
for (i = 0; i < $a.length; i++) {
    _href = $a.eq(i).attr("href");
    rewriteUrl = "http://" + window.location.host + _href + params;
    $a.eq(i).attr("href",rewriteUrl);
}

function getMeiqia() {
    (function (m, ei, q, i, a, j, s) {
        m[a] = m[a] || function () {
                (m[a].a = m[a].a || []).push(arguments)
            };
        j = ei.createElement(q),
            s = ei.getElementsByTagName(q)[0];
        j.async = true;
        j.charset = 'UTF-8';
        j.src = i + '?v=' + new Date().getUTCDate();
        s.parentNode.insertBefore(j, s);
    })(window, document, 'script', '//static.meiqia.com/dist/meiqia.js', '_MEIQIA');
    _MEIQIA('entId', 27864);
    _MEIQIA('withoutBtn');
};

var getContact = function () {
    getMeiqia();
    //$("#contactUs").show();
    _MEIQIA('showPanel');
    //writebdLog($scope.category, "_CustConsult", "渠道号", $scope.gh);//客服咨询
};
