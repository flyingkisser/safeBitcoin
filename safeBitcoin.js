
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
        "address memoryWorld\n" +
        "address_testnet memoryWorld\n" +
        "send_testnet amountInBtc dstAddress privateKey txid [index_of_txid(default 0)]\n"+
            "calculate_address_testnet privateKey\n"
    );
    process.exit(0);
};

let action=process.argv[2];
if(action==="address"){
    let memoryWorld=process.argv[3];
    if(!memoryWorld){
        printUsage();
        return;
    }
    let info=wallet.util.generateKeyPairFromStr(memoryWorld);
    cc.log("your address is %s,privateKey is %s",info.address,info.privateKey);
}else if(action==="address_testnet"){
    let memoryWorld=process.argv[3];
    if(!memoryWorld){
        printUsage();
        return;
    }
    let info=wallet.util.generateKeyPairFromStrTestnet(memoryWorld);
    cc.log("your testnet address is %s,privateKey is %s",info.address,info.privateKey);
}else if(action==="send_testnet"){
    let amount=process.argv[3];
    let dstAddress=process.argv[4];
    let privateKey=process.argv[5];
    let txid=process.argv[6];
    let index=process.argv[7];
    if(!index)
        index=0;
    if(!amount || !dstAddress || !privateKey || !txid){
        printUsage();
        return;
    }
    let signHash=transaction.util.signTestnet(privateKey,dstAddress,parseFloat(amount),txid,parseInt(index));
    // You could now push the transaction onto the Bitcoin network manually
    // (see https://blockchain.info/pushtx)
    cc.log("transaction from address %s to %s, amount %f, use txid %s index %d signature data is :\n" +
        "-----------------------------------------------------\n%s\n"+
        "-----------------------------------------------------",
        wallet.util.privateKey2AddressTesnet(privateKey),dstAddress,amount,txid,index,signHash
    )
}else if(action==="calculate_address_testnet"){
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

