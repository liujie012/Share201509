//���õ���ģʽ����װ���ǳ��õķ�����,����ֻ��Ҫ�����еĳ��õķ���������utils��������ռ��¼���
var utils = {
    //listToArray:ʵ�ֽ�������ת��Ϊ����
    listToArray: function (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    },
    //toJSON:��JSON��ʽ���ַ���ת��ΪJSON��ʽ�Ķ���
    toJSON: function (str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }
};