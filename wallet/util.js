/**
 * Created by joe on 2017/11/30.
 */
wallet.util={
    rand:function () {
        var randRng=String(ccsp.time.getTimeMS());
        var randRng2=ccsp.rand.getRandStr(32);
        return Buffer.from(randRng2);
    },

    generateKeyPairRandomly:function () {
        let keyPair=g_bitcoinlib.ECPair.makeRandom({rng:this.rand.bind(this)});
        return {privateKey:keyPair.toWIF(),address:keyPair.getAddress()};
    },

    generateKeyPairFromStr:function (str) {
        if(!str)
            return "";
        var hash = g_bitcoinlib.crypto.sha256(str);
        var d = require('bigi').fromBuffer(hash);
        var keyPair = new g_bitcoinlib.ECPair(d);
        var addr=keyPair.getAddress();
        return {privateKey:keyPair.toWIF(),address:keyPair.getAddress()};
    },
    generateKeyPairFromStrTestnet:function (str) {
        if(!str)
            return "";
        var hash = g_bitcoinlib.crypto.sha256(str);
        var d = require('bigi').fromBuffer(hash);
        var keyPair = new g_bitcoinlib.ECPair(d,null,{"compressed":true,"network":g_bitcoinlib.networks.testnet});
        var addr=keyPair.getAddress();
        return {privateKey:keyPair.toWIF(),address:keyPair.getAddress()};
    },
    generateKeyPairFromStrLitcoin:function (str) {
        if(!str)
            return "";
        var hash = g_bitcoinlib.crypto.sha256(str);
        var d = require('bigi').fromBuffer(hash);
        var keyPair = new g_bitcoinlib.ECPair(d,null,{"compressed":true,"network":g_bitcoinlib.networks.litecoin});
        var addr=keyPair.getAddress();
        return {privateKey:keyPair.toWIF(),address:keyPair.getAddress()};
    },
    privateKey2Address:function (privateKey) {
        var ecpair=g_bitcoinlib.ECPair.fromWIF(privateKey);
        return ecpair.getAddress();
    },
    privateKey2AddressTesnet:function (privateKey) {
        var ecpair=g_bitcoinlib.ECPair.fromWIF(privateKey,g_bitcoinlib.networks.testnet);
        return ecpair.getAddress();
    }

};