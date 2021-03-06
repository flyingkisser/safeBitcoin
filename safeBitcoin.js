
wallet={};
transaction={};
config={};

require("./common-js/server/global.js");
require("./wallet/util.js");
require("./transaction/util.js");

g_bitcoinlib = require('bitcoinjs-lib');
config.base=ccsp.config.getFromJson("./res/config/base.json");

// let testAddr=wallet.util.generateKeyPairRandomly();
// cc.log("\nnew addr is %s\nyour private key is :\n%s",testAddr.address,testAddr.privateKey);
// cc.log("add len %d key len %d",testAddr.address.length,testAddr.privateKey.length);
//
//
// testAddr=wallet.util.generateKeyPairFromStr("it's a joke!");
// cc.log("\nnew addr is %s\nyour private key is :\n%s",testAddr.address,testAddr.privateKey);
// cc.log("add len %d key len %d",testAddr.address.length,testAddr.privateKey.length);
//
// var key="KxwhcMdjRHzYLLgYMr6dm9JHoed4dNGKb5cfrLU2c9fXEj956mbL";
// var addr="1BakXWbRyWk12GDUuAUfttXHDsX2PMUVCm";
// transaction.util.doTrans(key,addr,0.001);

var printUsage=function () {
    cc.logNoDate("safeBitcoin usage:\n" +
        "getaddr memoryWord\n" +
        "getaddr_testnet memoryWord\n" +
        "sign_testnet amountInBtc dstAddress privateKey txid [index_of_txid(default 0)] amountTotal amountFee\n"+
            "addrFromKey_testnet privateKey\n"
    );
    process.exit(0);
};

let action=process.argv[2];
if(action==="getaddr"){
    let memoryWorld=process.argv[3];
    if(!memoryWorld){
        printUsage();
        return;
    }
    let info=wallet.util.generateKeyPairFromStr(memoryWorld);
    cc.log("your address is %s,privateKey is %s",info.address,info.privateKey);
}else if(action==="getaddr_testnet"){
    let memoryWorld=process.argv[3];
    if(!memoryWorld){
        printUsage();
        return;
    }
    let info=wallet.util.generateKeyPairFromStrTestnet(memoryWorld);
    cc.log("your testnet address is %s,privateKey is %s",info.address,info.privateKey);
}else if(action==="sign_testnet"){
    let amountSend=parseFloat(process.argv[3]);
    let dstAddress=process.argv[4];
    let privateKey=process.argv[5];
    let txid=process.argv[6];
    let index=parseInt(process.argv[7]);
    let amountTotal=parseFloat(process.argv[8]);
    let amountFee=parseFloat(process.argv[9]);
    if(!index)
        index=0;
    if(!amountSend || !dstAddress || !privateKey || !txid || !amountTotal || !amountFee){
        printUsage();
        return;
    }
    if(amountTotal-amountFee-amountSend<0){
        cc.log("total %f should >= fee %f + send %f",amountTotal,amountFee,amountSend);
        process.exit(-1);
    }
    let signHash=transaction.util.signTestnet(privateKey,dstAddress,amountSend,txid,index,amountTotal,amountFee);
    // You could now push the transaction onto the Bitcoin network manually
    // (see https://blockchain.info/pushtx)
    cc.logNoDate("\ntransaction from address %s to %s, use txid %s index %d\n" +
        "send %f,fee %f change %f total %f signature data is :\n" +
        "-----------------------------------------------------\n%s\n"+
        "-----------------------------------------------------",
        wallet.util.privateKey2AddressTesnet(privateKey),dstAddress,txid,index,
        amountSend,amountFee,amountTotal-amountFee-amountSend,amountTotal,
        signHash);
    cc.logNoDate("later,you can post the transaction through https://testnet.blockchain.info/pushtx");
}else if(action==="addrFromKey_testnet"){
    let privateKey=process.argv[3];
    if(!privateKey){
        printUsage();
        return;
    }
    let addr=wallet.util.privateKey2AddressTesnet(privateKey);
    cc.log("address is %s",addr);
}
else{
    printUsage();
}

