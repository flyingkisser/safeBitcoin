/**
 * Created by joe on 2017/11/30.
 */
wallet.util={
    rand:function () {
        var randRng=String(ccsp.time.getTimeMS());
        var randRng2=ccsp.rand.getRandStr(32);
        return Buffer.from(randRng2);
    },

    createAddressAndPrivateKey:function () {
        let keyPair=g_bitcoinlib.ECPair.makeRandom({rng:this.rand.bind(this)});
        return {privateKey:keyPair.toWIF(),address:keyPair.getAddress()};
    },

    createAddressAndPrivateKeyFromStr:function (str) {
        if(!str)
            return "";
        var hash = g_bitcoinlib.crypto.sha256(str);
        var d = require('bigi').fromBuffer(hash);
        var keyPair = new g_bitcoinlib.ECPair(d);
        var addr=keyPair.getAddress();
        return {privateKey:keyPair.toWIF(),address:keyPair.getAddress()};
    },


};