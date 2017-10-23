
/**
 * 支付通道配置
 */
var PayCannelTypeEnum={
	// 威富通微信正扫
	WeiFuTongWXScan:3,
	// 威富通支付宝正扫
	WeiFuTongAliScan:14,
	// 融宝快捷
	UBPay:6,
	// 融宝H5支付
	UBH5Pay:7,
	//	易宝支付
	YBPay:8,
	// 易宝微信扫码
	YBScan:21,
	// 易宝银行卡
	YBBankCard:22,
	//优畅WX正扫支付
	YCWXScan:24,
	//荣宝WX正扫支付
	UBWXScan:25,
	//优畅支付宝正扫支付
	YCAliScan:23,
	//荣宝支付宝正扫支付
	UBAliScan:26
}

//var PayCannelScenesIdEnum={
//	//收纳通微信正扫
//	ShoutBaScan:"d481fadf-1dde-43cb-9685-d8a0218c398f",
//	//兴店(店铺分享)Web支付
//	XinDianWeb:"51348df8-f5b4-48bb-9fa0-d37facc1585d"
//}

module.exports=PayCannelTypeEnum;