/**
 * Created by joe on 2017/11/30.
 */
transaction.util={
    signTestnet:function (privateKeyWIF,dstAddress,amountInBtc,txID,index,amountTotal,amountFee) {
        var tx = new g_bitcoinlib.TransactionBuilder(g_bitcoinlib.networks.testnet);

        if(!privateKeyWIF || !dstAddress || !amountInBtc){
            cc.log("doTrans:parameter error!");
            return false;
        }
        if(amountInBtc<config.base.satoshis){
            cc.log("doTrans:btc for send is too small,%f,at lease %f",amountInBtc,config.base.satoshis);
            return false;
        }
        if(!index)
            index=0;
        // Add the input (who is paying):
        // [previous transaction hash, index of the output to use]
        //var txID = 'aa94ab02c182214f090e99a0d57021caffd0f195a81c24602b1028b130b63e31';
        tx.addInput(txID, index);

        // Add the output (who to pay to):
        // [payee's address, amount in satoshis]
        // tx.addOutput("1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK", 15000);

        var satoshisSend=amountInBtc*100000000;
        satoshisSend=Math.floor(satoshisSend);
        tx.addOutput(dstAddress,satoshisSend);

        var staoshsiChange=(amountTotal-amountFee-amountInBtc)*100000000;
        if(staoshsiChange>0){
            staoshsiChange=Math.floor(staoshsiChange);
            var ecpair=g_bitcoinlib.ECPair.fromWIF(privateKeyWIF,g_bitcoinlib.networks.testnet);
            tx.addOutput(ecpair.getAddress(),staoshsiChange);
        }

        // Initialize a private key using WIF
        // var privateKeyWIF = 'L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy'
        var keyPair = g_bitcoinlib.ECPair.fromWIF(privateKeyWIF,g_bitcoinlib.networks.testnet);

        // Sign the first input with the new key
        tx.sign(index, keyPair);

        // Print transaction serialized as hex
        //cc.log("signature data is:\n"+tx.build().toHex());

        return tx.build().toHex();
        // => 0100000001313eb630b128102b60241ca895f1d0ffca21 ...

        // You could now push the transaction onto the Bitcoin network manually
        // (see https://testnet.blockchain.info/pushtx)
    },

    sign:function (privateKeyWIF,dstAddress,amountInBtc,txID,index) {
        var tx = new g_bitcoinlib.TransactionBuilder();

        if(!privateKeyWIF || !dstAddress || !amountInBtc){
            cc.log("doTrans:parameter error!");
            return false;
        }
        if(amountInBtc<config.base.satoshis){
            cc.log("doTrans:btc for send is too small,%f,at lease %f",amountInBtc,config.base.satoshis);
            return false;
        }
        if(!index)
            index=0;
        // Add the input (who is paying):
        // [previous transaction hash, index of the output to use]
        //var txID = 'aa94ab02c182214f090e99a0d57021caffd0f195a81c24602b1028b130b63e31';
        tx.addInput(txID, index);

        // Add the output (who to pay to):
        // [payee's address, amount in satoshis]
        // tx.addOutput("1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK", 15000);
        var satoshis=amountInBtc*100000000;
        satoshis=Math.floor(satoshis);
        tx.addOutput(dstAddress,satoshis);

        // Initialize a private key using WIF
        // var privateKeyWIF = 'L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy'
        var keyPair = g_bitcoinlib.ECPair.fromWIF(privateKeyWIF);

        // Sign the first input with the new key
        tx.sign(index, keyPair);

        // Print transaction serialized as hex
        //cc.log("signature data is:\n"+tx.build().toHex());

        return tx.build().toHex();
        // => 0100000001313eb630b128102b60241ca895f1d0ffca21 ...

        // You could now push the transaction onto the Bitcoin network manually
        // (see https://blockchain.info/pushtx)
    }
};